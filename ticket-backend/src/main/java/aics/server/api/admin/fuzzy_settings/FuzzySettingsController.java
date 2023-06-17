package aics.server.api.admin.fuzzy_settings;

import aics.domain.fuzzy.dtos.FuzzyProfileDto;
import aics.domain.user.RoleEnum;
import aics.infrastructure.errors.TicketException;
import aics.server.api.admin.admin_shared.AdminConstants;
import aics.server.api.admin.fuzzy_settings.dtos.CreateFuzzyProfileResponseDto;
import aics.server.api.admin.fuzzy_settings.dtos.FetchFuzzyProfilesResponseDto;
import io.quarkus.logging.Log;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
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

    @Path("/create_fuzzy_profile")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<CreateFuzzyProfileResponseDto> handleCreateFuzzyProfile(FuzzyProfileDto fuzzyProfileDto) {
        Log.info("Start ProvidersController.handleCreateFuzzyProfile");
        System.out.println("THANOS_CONTROLLER");
        System.out.println(fuzzyProfileDto);
        try {
            CreateFuzzyProfileResponseDto fetchFuzzyProfilesResponseDto = this.fuzzySettingsActions.doCreateFuzzyProfile(fuzzyProfileDto);
            Log.info("End ProvidersController.handleCreateFuzzyProfile");
            return RestResponse.ok(fetchFuzzyProfilesResponseDto);
        } catch (TicketException e) {
            Log.error("End ProvidersController.handleCreateFuzzyProfile with error", e);
            return RestResponse.status(e.getStatus(), new CreateFuzzyProfileResponseDto(null, e.getErrors()));
        } catch (Exception e) {
            Log.error("End ProvidersController.handleCreateFuzzyProfile with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }

//    @Path("/update_fuzzy_profile")
//    @PUT
//    @Produces(MediaType.APPLICATION_JSON)
//    public RestResponse<FetchFuzzyProfilesResponseDto> handleUpdateFuzzyProfile() {
//        Log.info("Start ProvidersController.handleUpdateFuzzyProfile");
//        try {
//            FetchFuzzyProfilesResponseDto fetchFuzzyProfilesResponseDto = this.fuzzySettingsActions.doFetchFuzzyProfiles();
//            Log.info("End ProvidersController.handleUpdateFuzzyProfile");
//            return RestResponse.ok(fetchFuzzyProfilesResponseDto);
//        } catch (TicketException e) {
//            Log.error("End ProvidersController.handleUpdateFuzzyProfile with error", e);
//            return RestResponse.status(e.getStatus(), null);
//        } catch (Exception e) {
//            Log.error("End ProvidersController.handleUpdateFuzzyProfile with error", e);
//            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
//        }
//    }
//
//    @Path("/delete_fuzzy_profile")
//    @DELETE
//    @Produces(MediaType.APPLICATION_JSON)
//    public RestResponse<FetchFuzzyProfilesResponseDto> handleDeleteFuzzyProfile() {
//        Log.info("Start ProvidersController.handleDeleteFuzzyProfile");
//        try {
//            FetchFuzzyProfilesResponseDto fetchFuzzyProfilesResponseDto = this.fuzzySettingsActions.doFetchFuzzyProfiles();
//            Log.info("End ProvidersController.handleDeleteFuzzyProfile");
//            return RestResponse.ok(fetchFuzzyProfilesResponseDto);
//        } catch (TicketException e) {
//            Log.error("End ProvidersController.handleDeleteFuzzyProfile with error", e);
//            return RestResponse.status(e.getStatus(), null);
//        } catch (Exception e) {
//            Log.error("End ProvidersController.handleDeleteFuzzyProfile with error", e);
//            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
//        }
//    }
}