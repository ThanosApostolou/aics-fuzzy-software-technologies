import { GlobalState } from "../../../modules/core/global-state";
import { FUZZY_CONSTANTS } from "../../../modules/fuzzy/fuzzy-constants";
import { FetchFuzzyProfilesResponseDto } from "./dtos/fetch-fuzzy-profiles-dto";

export class FuzzySettingsService {
    static async fetchAllFuzzyProfiles(): Promise<string[]> {
        return Promise.resolve([FUZZY_CONSTANTS.DEFAULT])
    }


    static async fetchFuzzyProfiles(): Promise<FetchFuzzyProfilesResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchFuzzyProfilesUrl = '/admin/fuzzy_settings/fetch_fuzzy_profiles'

        const response = await apiConsumer.get(fetchFuzzyProfilesUrl);
        const fetchProvidersListResponseDto: FetchFuzzyProfilesResponseDto = FetchFuzzyProfilesResponseDto.fromObj(response.data);
        return fetchProvidersListResponseDto;
    }
}