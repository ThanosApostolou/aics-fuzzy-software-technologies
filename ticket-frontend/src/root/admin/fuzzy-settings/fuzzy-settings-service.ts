import { GlobalState } from "../../../modules/core/global-state";
import { FUZZY_CONSTANTS } from "../../../modules/fuzzy/fuzzy-constants";
import { FuzzyVariableDistributionPart, FuzzyVariableDistributionPartTrapezoidal, FuzzyVariableDistributionPartTriangular } from "../../../modules/fuzzy/fuzzy-variable-distribution";
import { FuzzyVariablePopularity } from "../../../modules/fuzzy/fuzzy-variable-popularity";
import { FuzzyVariableRating } from "../../../modules/fuzzy/fuzzy-variable-rating";
import { FuzzyVariableYear } from "../../../modules/fuzzy/fuzzy-variable-year";
import { FetchFuzzyProfileResponseDto } from "./dtos/fetch-fuzzy-profile-dto";
import { FetchFuzzyProfilesResponseDto } from "./dtos/fetch-fuzzy-profiles-dto";

export class FuzzySettingsService {
    static async fetchAllFuzzyProfiles(): Promise<string[]> {
        return Promise.resolve([FUZZY_CONSTANTS.DEFAULT])
    }


    static async fetchFuzzyProfile(name: string): Promise<FetchFuzzyProfileResponseDto> {
        return Promise.resolve(new FetchFuzzyProfileResponseDto({
            year: new FuzzyVariableYear({
                varOld: new FuzzyVariableDistributionPartTriangular({
                    a: null,
                    b: 1950,
                    c: 2005,
                }),
                varRecent: new FuzzyVariableDistributionPartTriangular({
                    a: 2000,
                    b: 2010,
                    c: 2015,
                }),
                varNew: new FuzzyVariableDistributionPartTriangular({
                    a: 2010,
                    b: 2015,
                    c: 2022,
                }),
                varVeryNew: new FuzzyVariableDistributionPartTriangular({
                    a: 2020,
                    b: 2030,
                    c: null,
                })
            }),
            rating: new FuzzyVariableRating({
                varBad: new FuzzyVariableDistributionPartTrapezoidal({
                    a: null,
                    b: 1,
                    c: 3,
                    d: 5
                }),
                varAverage: new FuzzyVariableDistributionPartTrapezoidal({
                    a: 4,
                    b: 5,
                    c: 6,
                    d: 7
                }),
                varGood: new FuzzyVariableDistributionPartTrapezoidal({
                    a: 6,
                    b: 7,
                    c: 8,
                    d: 9
                }),
                varVeryGood: new FuzzyVariableDistributionPartTrapezoidal({
                    a: 8,
                    b: 9,
                    c: 10,
                    d: null
                })
            }),
            popularity: new FuzzyVariablePopularity({
                varVeryPopular: new FuzzyVariableDistributionPartTrapezoidal({
                    a: null,
                    b: 1,
                    c: 20,
                    d: 40
                }),
                varPopular:  new FuzzyVariableDistributionPartTrapezoidal({
                    a: 20,
                    b: 40,
                    c: 60,
                    d: 80
                }),
                varAverage: new FuzzyVariableDistributionPartTrapezoidal({
                    a: 60,
                    b: 80,
                    c: 100,
                    d: 120
                }),
                varUnpopular: new FuzzyVariableDistributionPartTrapezoidal({
                    a: 100,
                    b: 150,
                    c: 200,
                    d: null
                })
            })
        }))
    }

    static async fetchFuzzyProfiles(): Promise<FetchFuzzyProfilesResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchFuzzyProfilesUrl = '/admin/fuzzy_settings/fetch_fuzzy_profiles'

        const response = await apiConsumer.get(fetchFuzzyProfilesUrl);
        const fetchProvidersListResponseDto: FetchFuzzyProfilesResponseDto = FetchFuzzyProfilesResponseDto.fromObj(response.data);
        return fetchProvidersListResponseDto;
    }
}