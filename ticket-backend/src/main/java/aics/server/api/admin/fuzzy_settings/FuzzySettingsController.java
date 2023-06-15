package aics.server.api.admin.fuzzy_settings;

import aics.domain.user.RoleEnum;
import aics.infrastructure.errors.TicketException;
import aics.server.api.admin.admin_shared.AdminConstants;
import aics.server.api.admin.fuzzy_settings.dtos.FetchFuzzyProfilesResponseDto;
import io.quarkus.logging.Log;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.reactive.RestResponse;

@Path(AdminConstants.ADMIN_PATH + "/fuzzy_settings")
@RolesAllowed(RoleEnum.Values.TICKET_ADMIN)
public class FuzzySettingsController {
    @Inject
    FuzzySettingsActions fuzzySettingsActions;

    @Path("/fetch_fuzzy_profiles")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<FetchFuzzyProfilesResponseDto> handleFetchFuzzyProfiles() {
        Log.info("Start ProvidersController.handleFetchProvidersList");
        try {
            FetchFuzzyProfilesResponseDto fetchFuzzyProfilesResponseDto = this.fuzzySettingsActions.doFetchFuzzyProfiles();
            Log.info("End ProvidersController.handleFetchProvidersList");
            return RestResponse.ok(fetchFuzzyProfilesResponseDto);
        } catch (TicketException e) {
            Log.error("End ProvidersController.handleFetchProvidersList with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End ProvidersController.handleFetchProvidersList with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }
}