
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from 'react-tippy';
import { motion, AnimatePresence } from 'framer-motion'
import { faChevronRight, faChevronLeft, faHeart, faCheck } from '@fortawesome/free-solid-svg-icons'
import './styles.css'
import { getAllAnimes } from '../../services/animesService'
import { getCurrentUser } from '../../services/authService'
import { Colors } from '../../constants/Colors'
import { createFavoriteAnime, deleteFavoriteAnime, getAllFavoriteAnimes } from '../../services/favoriteAnimesService'

function Dashboard() {
    const [page, setPage] = useState(1)
    const [favoritesPage, setFavoritesPage] = useState(1)
    const [animes, setAnimes] = useState({ data: [], pagination: { current_page: 1, has_next_page: false } })
    const [favoriteAnimes, setFavoriteAnimes] = useState({ data: [], pagination: { currentPage: 1, hasNextPage: false } })
    const [loadedImages, setLoadedImages] = useState({})
    const [loading, setLoading] = useState(false)
    const [favoritesOnly, setFavoritesOnly] = useState(false)

    useEffect(() => {
        async function loadAnimes() {
            const user = getCurrentUser()

            if (user) {
                setLoading(true)
                const { response } = await getAllAnimes(user.sub, page)

                if (response && response.data && response.data.animes) {
                    const { data, pagination } = response.data.animes

                    setAnimes({ data, pagination })
                }
                setLoadedImages({})
                setLoading(false)
            }
        }
        loadAnimes()
    }, [page])

    useEffect(() => {
        async function loadFavoriteAnimes() {
            const user = getCurrentUser()

            if (user) {
                setLoading(true)
                const { response } = await getAllFavoriteAnimes(user.sub, favoritesPage)

                if (response && response.data && response.data.favoriteAnimes) {
                    const { data, pagination } = response.data.favoriteAnimes

                    setFavoriteAnimes({ data, pagination })
                }
                setLoadedImages({})
                setLoading(false)
            }
        }
        if (favoritesOnly) {
            loadFavoriteAnimes()
        }
    }, [favoritesPage, favoritesOnly])

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

    const handleImageLoad = (id) => {
        setLoadedImages((prev) => ({ ...prev, [id]: true }))
    }

    const fadeAnimation = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.5 },
    }

    return (
        <div className='dashboard-wrapper'>
            <div className="dashboard-favorite-button">
                <span onClick={toggleFavoritesOnly} className={favoritesOnly ? 'text-rosa-choque' : ''}>Favorites only</span>
                {favoritesOnly ? <FontAwesomeIcon color={Colors.rosaChoque} icon={faCheck} size='sm' style={{ marginLeft: 5 }} /> : null}
            </div>
            <div className="dashboard">
                <FontAwesomeIcon onClick={() => {
                    if (favoritesOnly) {
                        handleFavoritePrevious()
                    } else {
                        handlePrevious()
                    }
                }} className="previous-button" icon={faChevronLeft} style={{ display: getPreviousArrowDisplay() }} />
                    <div className='images-wrapper'>
                        <AnimatePresence mode='wait'>
                            <motion.div className='images-wrapper' {...fadeAnimation}key={`${favoritesOnly}-${favoritesOnly ? favoritesPage : page}`}>
                            {
                                favoritesOnly && favoriteAnimes.data.length ? favoriteAnimes.data.map((a, i) => {
                                    let animeImage = a.animeImage

                                    return (
                                        <div className='dashboard-images-wrapper' key={i}>
                                            <div className="image-container">
                                                <img
                                                    onLoad={() => handleImageLoad(a.id || i)}
                                                    style={{ display: loadedImages[a.id || i] ? 'block' : 'none' }}
                                                    className="dashboard-image"
                                                    src={animeImage}
                                                    alt="anime"
                                                />
                                                <span className="additional-info">
                                                    <span><strong className='text-rosa-choque'>Name:</strong> {a.animeName}</span><br />
                                                    <span><strong className='text-rosa-choque'>Episodes:</strong> {a.animeEpisodes || '??'}</span>
                                                </span>
                                            </div>
                                            <Tooltip
                                                title="Unfavorite..."
                                                position="bottom"
                                                trigger="mouseenter"
                                                size='small'
                                                arrow
                                            >
                                                <FontAwesomeIcon className='favorite-heart' onClick={() => toggleFavorite(a, true)} icon={faHeart} size='xl' color={ Colors.vermelho } />
                                            </Tooltip>
                                        </div>
                                    )
                                })  :
                                favoritesOnly && !favoriteAnimes.data.length ? <span>Nothing here yet... Favorite some animes!</span>
                                :
                                animes.data.map((a, i) => {
                                    return (
                                        <div className='dashboard-images-wrapper' key={i}>
                                            <div
                                                className={`image-placeholder dashboard-images-wrapper ${loadedImages[a.id || i] ? 'loaded' : ''}`}
                                                style={{ width: 245, height: 400 }} // Define tamanho fixo
                                            >
                                                <div className="image-container">
                                                    <img
                                                        onLoad={() => handleImageLoad(a.id || i)}
                                                        style={{ display: loadedImages[a.id || i] ? 'block' : 'none' }}
                                                        className="dashboard-image"
                                                        src={getAnimeImageUrl(a)}
                                                        alt="anime"
                                                    />
                                                    <span className="additional-info">
                                                        <span><strong className='text-rosa-choque'>Name:</strong> {a.title}</span><br />
                                                        <span><strong className='text-rosa-choque'>Episodes:</strong> {a.episodes || '??'}</span>
                                                    </span>
                                                </div>
                                                <Tooltip
                                                    title={a.favoriteAnime ? "Unfavorite..." : "Favorite!"}
                                                    position="bottom"
                                                    trigger="mouseenter"
                                                    size='small'
                                                    arrow
                                                >
                                                    <FontAwesomeIcon className='favorite-heart' onClick={() => toggleFavorite(a, !!a.favoriteAnime)} icon={faHeart} size='xl' color={ a.favoriteAnime ? Colors.vermelho : Colors.roxo } />
                                                </Tooltip>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            </motion.div>
                        </AnimatePresence>
                    </div>
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