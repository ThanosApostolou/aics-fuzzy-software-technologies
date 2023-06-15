package aics.server.api.admin.fuzzy_settings;

import aics.domain.fuzzy.constants.FuzzyConstants;
import aics.infrastructure.errors.TicketException;
import aics.server.api.admin.fuzzy_settings.dtos.FetchFuzzyProfilesNamesResponseDto;
import io.quarkus.logging.Log;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class FuzzySettingsActions {

    @Transactional(rollbackOn = Exception.class)
    public FetchFuzzyProfilesNamesResponseDto doFetchFuzzyProfileNames() throws TicketException {
        Log.info("Start FuzzySettingsActions.doFetchFuzzyProfileNames");
        List<String> fuzzyProfiles = new ArrayList<String>(List.of(FuzzyConstants.DEFAULT));
        FetchFuzzyProfilesNamesResponseDto fetchProvidersListResponseDto = new FetchFuzzyProfilesNamesResponseDto()
                .setFuzzyProfilesNames(fuzzyProfiles);
        Log.info("End FuzzySettingsActions.doFetchFuzzyProfileNames");
        return fetchProvidersListResponseDto;
    }

}