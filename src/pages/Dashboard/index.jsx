
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import './styles.css'
import { getAllAnimes } from '../../services/animesService'
import { getCurrentUser } from '../../services/authService'
import { createFavoriteAnime, deleteFavoriteAnime, getAllFavoriteAnimes } from '../../services/favoriteAnimesService'
import ImagesWrapper from '../../components/ImagesWrapper';
import Input from '../../components/Input'
import Button from '../../components/Button'

function Dashboard() {
    const [page, setPage] = useState(1)
    const [favoritesPage, setFavoritesPage] = useState(1)
    const [animes, setAnimes] = useState({ data: [], pagination: { current_page: 1, has_next_page: false } })
    const [favoriteAnimes, setFavoriteAnimes] = useState({ data: [], pagination: { currentPage: 1, hasNextPage: false } })
    const [loadedImages, setLoadedImages] = useState({})
    const [loading, setLoading] = useState(false)
    const [favoritesOnly, setFavoritesOnly] = useState(false)
    const [updateFavoriteAnimes, setUpdateFavoriteAnimes] = useState(false)
    const [search, setSearch] = useState('')
    const [debounceSearch, setDebounceSearch] = useState('')
    const [favoriteSearch, setFavoriteSearch] = useState('')
    const [debounceFavoriteSearch, setDebounceFavoriteSearch] = useState('')
    const [searchKey, setSearchKey] = useState(0)

    useEffect(() => {
        const handler = setTimeout(() => {
            setPage(1)
            setDebounceSearch(search);
          }, 800);
      
          return () => clearTimeout(handler);
    }, [search])

    useEffect(() => {
        const handler = setTimeout(() => {
            setFavoritesPage(1)
            setDebounceFavoriteSearch(favoriteSearch);
          }, 800);
      
          return () => clearTimeout(handler);
    }, [favoriteSearch])

    useEffect(() => {
        async function loadAnimes() {
            const user = getCurrentUser()

            if (user) {
                setSearchKey(searchKey + 1)
                setLoadedImages({})
                setLoading(true)
                const { response } = await getAllAnimes(user.sub, page, debounceSearch)

                if (response && response.data && response.data.animes) {
                    const { data, pagination } = response.data.animes

                    setAnimes({ data, pagination })
                }
                
                setLoading(false)
            }
        }
        loadAnimes()
    }, [page, debounceSearch])

    useEffect(() => {
        async function loadFavoriteAnimes() {
            const user = getCurrentUser()

            if (user) {
                setSearchKey(searchKey + 1)
                setLoadedImages({})
                setLoading(true)
                const pageToUse = favoritesPage || 1

                const { response } = await getAllFavoriteAnimes(user.sub, pageToUse, debounceFavoriteSearch)

                if (response && response.data && response.data.favoriteAnimes) {
                    const { data, pagination } = response.data.favoriteAnimes

                    setFavoriteAnimes({ data, pagination })
                    setFavoritesPage(pagination.currentPage)
                }
                setLoading(false)
                setUpdateFavoriteAnimes(false)
            }
        }
        if (favoritesOnly) {
            loadFavoriteAnimes()
        }
    }, [favoritesPage, favoritesOnly, debounceFavoriteSearch])

    function handlePrevious() {
        if (page === 1 || loading) return

        setPage(page - 1)
    }

    function handleNext() {
        if (!animes.pagination.has_next_page || loading) return

        setPage(page + 1)
    }

    function handleFavoritePrevious() {
        if (favoritesPage === 1 || loading) return

        setFavoritesPage(favoritesPage - 1)
    }

    function handleFavoriteNext() {
        if (!favoriteAnimes.pagination.hasNextPage || loading) return

        setFavoritesPage(favoritesPage + 1)
    }

    function toggleFavoritesOnly() {
        setFavoritesPage(1)
        setSearch('')
        setFavoriteSearch('')

        setFavoritesOnly(!favoritesOnly)
    }

    function getAnimeImageUrl(anime) {
        let animeImage = ''

        if (anime && anime.images && anime.images) {
            if (anime.images.jpg && anime.images.jpg.image_url) animeImage = anime.images.jpg.image_url
            else if (anime.images.webp && anime.images.webp.image_url) animeImage = anime.images.webp.image_url
        }

        return animeImage
    }

    function getNextArrowDisplay() {
        if (!favoritesOnly) {
            return !animes.pagination.has_next_page ? 'none' : 'unset'
        } else return !favoriteAnimes.pagination.hasNextPage ? 'none' : 'unset'
    }

    function getPreviousArrowDisplay() {
        if (!favoritesOnly) {
            return page === 1 ? 'none' : 'unset'
        } else return favoritesPage === 1 ? 'none' : 'unset'
    }

    async function toggleFavorite(anime, isFavorite) {
        const animeId = anime.favoriteAnimeId || anime.id
        if (isFavorite) {
            await deleteFavoriteAnime(animeId)

            if (favoritesOnly) {
                const newFavoriteAnimes = [...favoriteAnimes.data]

                const filteredFavoriteAnimes = newFavoriteAnimes.filter(f => f.id !== animeId)

                if (!filteredFavoriteAnimes.length) {
                    const previousPage = favoritesPage - 1

                    setFavoritesPage(previousPage)
                }

                setFavoriteAnimes({ ...favoriteAnimes, data: filteredFavoriteAnimes })
            }

            const newAnimes = [...animes.data]

            const idToUse = anime.mal_id ? String(anime.mal_id) : anime.animeId

            const animeFinded = newAnimes.find(a => String(a.mal_id) === idToUse)

            if (animeFinded) {
                animeFinded.favoriteAnime = false
                animeFinded.favoriteAnimeId = ''
            }

            setAnimes({ ...animes, data: newAnimes })
            
        } else {
            const user = getCurrentUser()

            let animeName = anime.title


            const payload = {
                userId: user.sub,
                animeId: anime.mal_id,
                animeName,
                animeEpisodes: anime.episodes,
                animeImage: getAnimeImageUrl(anime)
            }

            const newAnimes = [...animes.data]

            const animeFinded = newAnimes.find(a => a.mal_id === anime.mal_id)

            const { response } = await createFavoriteAnime(payload)

            if (animeFinded) {
                animeFinded.favoriteAnime = true
                animeFinded.favoriteAnimeId = response.data.favoriteAnimeId
            }

            setAnimes({ ...animes, data: newAnimes })
        }
    }

    function handleImageLoad(id) {
        setLoadedImages((prev) => ({ ...prev, [id]: true }))
    }

    function onSearchChange(e) {
        setSearch(e.target.value)
    }

    function onFavoriteSearchChange(e) {
        setFavoriteSearch(e.target.value)
    }

    return (
        <div className='dashboard-wrapper'>
            <div className='inputs dashboard-inputs'>
                <Input placeholder='Search anime...' type={'text'} value={favoritesOnly ? favoriteSearch : search} onChange={(e) => {
                    if (favoritesOnly) {
                        onFavoriteSearchChange(e)
                    } else {
                        onSearchChange(e)
                    }
                }} /> 
            </div>
            <div className="dashboard-favorite-button">
                <Button classes={ favoritesOnly ? '' : 'dark-button' } label={'Favorites only'} type={'button'}  onClick={toggleFavoritesOnly} />
            </div>
            <div className="dashboard">
                <FontAwesomeIcon onClick={() => {
                    if (favoritesOnly) {
                        handleFavoritePrevious()
                    } else {
                        handlePrevious()
                    }
                }} className="previous-button" icon={faChevronLeft} style={{ display: getPreviousArrowDisplay() }} />
                    <ImagesWrapper
                        searchKey={searchKey}
                        animes={animes}
                        favoriteAnimes={favoriteAnimes}
                        updateFavorites={updateFavoriteAnimes}
                        favoritesOnly={favoritesOnly}
                        favoritesPage={favoritesPage}
                        handleImageLoad={handleImageLoad}
                        loadedImages={loadedImages}
                        page={page}
                        toggleFavorite={toggleFavorite}
                    />
                    <FontAwesomeIcon onClick={() => {
                    if (favoritesOnly) {
                        handleFavoriteNext()
                    } else {
                        handleNext()
                    }
                }} className="next-button" icon={faChevronRight} style={{ display: getNextArrowDisplay() }} />
            </div>
        </div>
    )
}

export default Dashboard