package aics.server.api.movies;

import aics.infrastructure.errors.TicketException;
import aics.server.api.api_shared.ApiConstants;
import aics.server.api.movies.dtos.FetchMovieDetailsResponseDto;
import aics.server.api.movies.dtos.FetchMoviesPlayingNowResponseDto;
import io.quarkus.logging.Log;
import org.jboss.resteasy.reactive.RestPath;
import org.jboss.resteasy.reactive.RestResponse;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path(ApiConstants.API_PATH + "/movies")
public class MoviesController {
    @Inject
    MoviesActions moviesActions;

    @Path("/movies-playing-now")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<FetchMoviesPlayingNowResponseDto> handleFetchMoviesPlayingNow() {
        Log.info("Start MoviesController.handleFetchMoviesPlayingNow");
        try {
            FetchMoviesPlayingNowResponseDto fetchMoviesPlayingNowResponseDto = this.moviesActions.doFetchMoviesPlayingNow();
            Log.info("End MoviesController.handleFetchMoviesPlayingNow");
            return RestResponse.ok(fetchMoviesPlayingNowResponseDto);
        } catch (TicketException e) {
            Log.error("End MoviesController.handleFetchMoviesPlayingNow with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End MoviesController.handleFetchMoviesPlayingNow with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Path("/details/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<FetchMovieDetailsResponseDto> handleFetchMovieDetails(@RestPath Long id) {
        Log.info("Start MoviesController.handleFetchMovieDetails");
        try {
            FetchMovieDetailsResponseDto fetchMovieDetailsResponseDto = this.moviesActions.doFetchMovieDetails(id);
            Log.info("End MoviesController.handleFetchMovieDetails");
            return RestResponse.ok(fetchMovieDetailsResponseDto);
        } catch (TicketException e) {
            Log.error("End MoviesController.handleFetchMovieDetails with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End MoviesController.handleFetchMovieDetails with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }

}