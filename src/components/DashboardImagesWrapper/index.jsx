import PropTypes from "prop-types"
import AnimeImage from "../AnimeImage"

function DashboardImagesWrapper({ handleImageLoad, loadedImages, animeImage, toggleFavorite, anime, animeId, animeName, animeEpisodes, favoriteAnime }) {
    return (
            <div className='dashboard-images-wrapper'>
                <AnimeImage 
                    anime={anime}
                    animeEpisodes={animeEpisodes}
                    animeId={animeId}
                    animeImage={animeImage}
                    animeName={animeName}
                    favoriteAnime={favoriteAnime}
                    handleImageLoad={handleImageLoad}
                    loadedImages={loadedImages}
                    toggleFavorite={toggleFavorite}
                />
            </div>
            )
}

DashboardImagesWrapper.propTypes = {
    handleImageLoad: PropTypes.func,
    loadedImages: PropTypes.object,
    animeImage: PropTypes.string,
    toggleFavorite: PropTypes.func,
    anime: PropTypes.object,
    animeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    animeName: PropTypes.string,
    animeEpisodes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    favoriteAnime: PropTypes.bool,
}

export default DashboardImagesWrapper