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
    loadedImages: PropTypes.array,
    animeImage: PropTypes.string,
    toggleFavorite: PropTypes.func,
    anime: PropTypes.object,
    animeId: PropTypes.string,
    animeName: PropTypes.string,
    animeEpisodes: PropTypes.string,
    favoriteAnime: PropTypes.bool,
}

export default DashboardImagesWrapper