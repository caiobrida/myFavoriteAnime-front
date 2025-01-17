import PropTypes from "prop-types"
import { AnimatePresence, motion } from "framer-motion"
import DashboardImagesWrapper from "../DashboardImagesWrapper"
import NotFoundFavoriteAnimes from "../NotFoundFavoriteAnimes"

const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 },
}

function ImagesWrapper({ favoritesOnly, favoriteAnimes, favoritesPage, page, handleImageLoad, loadedImages, animes, toggleFavorite }) {
    function getAnimeImageUrl(anime) {
        let animeImage = ''

        if (anime && anime.images && anime.images) {
            if (anime.images.jpg && anime.images.jpg.image_url) animeImage = anime.images.jpg.image_url
            else if (anime.images.webp && anime.images.webp.image_url) animeImage = anime.images.webp.image_url
        }

        return animeImage
    }

    return (
        <div className='images-wrapper'>
            <AnimatePresence mode='wait'>
                <motion.div className='images-wrapper' {...fadeAnimation} key={`${favoritesOnly}-${favoritesOnly ? favoritesPage : page}`}>
                {
                    favoritesOnly && favoriteAnimes.data.length ? favoriteAnimes.data.map((a, i) => {
                        return (
                            <DashboardImagesWrapper 
                                anime={a}
                                animeEpisodes={a.animeEpisodes}
                                animeId={a.id || i}
                                animeImage={a.animeImage}
                                animeName={a.animeName}
                                favoriteAnime={true}
                                handleImageLoad={handleImageLoad}
                                key={i}
                                loadedImages={loadedImages}
                                toggleFavorite={toggleFavorite}
                            />
                        )
                    })  :
                    favoritesOnly && !favoriteAnimes.data.length ? <NotFoundFavoriteAnimes />
                    :
                    animes.data.map((a, i) => {
                        return (
                            <DashboardImagesWrapper 
                                anime={a}
                                animeEpisodes={a.episodes || '??'}
                                animeId={a.id || i}
                                animeImage={getAnimeImageUrl(a)}
                                animeName={a.title}
                                favoriteAnime={!!a.favoriteAnime}
                                handleImageLoad={handleImageLoad}
                                key={i}
                                loadedImages={loadedImages}
                                toggleFavorite={toggleFavorite}
                            />
                        )
                    })
                }
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

ImagesWrapper.propTypes = {
    handleImageLoad: PropTypes.func,
    loadedImages: PropTypes.array,
    toggleFavorite: PropTypes.func,
    favoritesOnly: PropTypes.bool,
    favoriteAnimes: PropTypes.array,
    favoritesPage: PropTypes.number,
    page: PropTypes.number,
    animes: PropTypes.array
}

export default ImagesWrapper