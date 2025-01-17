import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Tooltip } from "react-tippy"
import { Colors } from "../../constants/Colors"
import PropTypes from "prop-types"

function AnimeImage({ handleImageLoad, animeId, loadedImages, animeImage, animeEpisodes, animeName, toggleFavorite, anime, favoriteAnime }) {
    return (
        <>
            <div className="image-container">
                <img
                    onLoad={() => handleImageLoad(animeId)}
                    style={{ display: loadedImages[animeId] ? 'block' : 'none' }}
                    className="dashboard-image"
                    src={animeImage}
                    alt="anime"
                />
                <span className="additional-info">
                    <span><strong className='text-rosa-choque'>Name:</strong> {animeName}</span><br />
                    <span><strong className='text-rosa-choque'>Episodes:</strong> {animeEpisodes || '??'}</span>
                </span>
            </div>
            <Tooltip
                title={favoriteAnime ? "Unfavorite..." : "Favorite!"}
                position="bottom"
                trigger="mouseenter"
                size='small'
                arrow
            >
                <FontAwesomeIcon className='favorite-heart' onClick={() => toggleFavorite(anime, favoriteAnime)} icon={faHeart} size='xl' color={ favoriteAnime ? Colors.vermelho : Colors.roxo } />
            </Tooltip>
        </>
    )
}

AnimeImage.propTypes = {
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

export default AnimeImage