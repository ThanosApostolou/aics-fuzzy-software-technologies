package aics.domain.fuzzy;

import aics.domain.fuzzy.constants.*;
import aics.domain.fuzzy.dtos.FuzzyProfileDto;
import aics.domain.fuzzy.etities.FuzzyProfile;
import aics.domain.fuzzy.models.*;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class FuzzyProfileService {
    @Inject
    FuzzyProfileRepository fuzzyProfileRepository;
    @Inject
    FuzzyProfileValidator fuzzyProfileValidator;

    public FuzzyProfile createDefaultProfile(boolean isDefaultActive) {
        FuzzyVariableYear fuzzyVariableYear = new FuzzyVariableYear(
                new FuzzyVariableDistributionPartTriangular(FuzzyVariableYearFields.OLD.name(), null, 1950, 2005),
                new FuzzyVariableDistributionPartTriangular(FuzzyVariableYearFields.RECENT.name(), 2000, 2010, 2015),
                new FuzzyVariableDistributionPartTriangular(FuzzyVariableYearFields.NEW.name(), 2010, 2015, 2022),
                new FuzzyVariableDistributionPartTriangular(FuzzyVariableYearFields.VERY_NEW.name(), 2020, 2030, null)
        );

        FuzzyVariableRating fuzzyVariableRating = new FuzzyVariableRating(
                new FuzzyVariableDistributionPartTrapezoidal(FuzzyVariableRatingFields.BAD.name(), null, 1, 3, 5),
                new FuzzyVariableDistributionPartTrapezoidal(FuzzyVariableRatingFields.AVERAGE.name(), 4, 5, 6, 7),
                new FuzzyVariableDistributionPartTrapezoidal(FuzzyVariableRatingFields.GOOD.name(), 6, 7, 8, 9),
                new FuzzyVariableDistributionPartTrapezoidal(FuzzyVariableRatingFields.VERY_GOOD.name(), 8, 9, 10, null)
        );

        FuzzyVariablePopularity fuzzyVariablePopularity = new FuzzyVariablePopularity(
                new FuzzyVariableDistributionPartTrapezoidal(FuzzyVariablePopularityFields.VERY_POPULAR.name(), null, 1, 20, 40),
                new FuzzyVariableDistributionPartTrapezoidal(FuzzyVariablePopularityFields.POPULAR.name(), 30, 60, 90, 120),
                new FuzzyVariableDistributionPartTrapezoidal(FuzzyVariablePopularityFields.AVERAGE.name(), 100, 150, 200, 250),
                new FuzzyVariableDistributionPartTrapezoidal(FuzzyVariablePopularityFields.UNPOPULAR.name(), 200, 400, 600, null)
        );

        FuzzyVariableDuration fuzzyVariableDuration = new FuzzyVariableDuration(
                new FuzzyVariableDistributionPartTrapezoidal(FuzzyVariableDurationFields.SMALL.name(), null, 1, 20, 40),
                new FuzzyVariableDistributionPartTriangular(FuzzyVariableDurationFields.AVERAGE.name(), 30, 60, 90),
                new FuzzyVariableDistributionPartTriangular(FuzzyVariableDurationFields.BIG.name(), 80, 120, 160),
                new FuzzyVariableDistributionPartTrapezoidal(FuzzyVariableDurationFields.HUGE.name(), 140, 160, 300, null)
        );

        FuzzyWeights fuzzyWeights = new FuzzyWeights(
                new FuzzyVariableDistributionPartTriangular(FuzzyWeightsFields.LOW_IMPORTANCE.name(), null, 1, 3),
                new FuzzyVariableDistributionPartTriangular(FuzzyWeightsFields.AVERAGE_IMPORTANCE.name(), 2, 5, 7),
                new FuzzyVariableDistributionPartTriangular(FuzzyWeightsFields.HIGH_IMPORTANCE.name(), 6, 7, 8),
                new FuzzyVariableDistributionPartTriangular(FuzzyWeightsFields.VERY_HIGH_IMPORTANCE.name(), 7, 9, null)
        );

        FuzzyProfileData fuzzyProfileData = new FuzzyProfileData()
                .setFuzzyVariableYear(fuzzyVariableYear)
                .setFuzzyVariableRating(fuzzyVariableRating)
                .setFuzzyVariablePopularity(fuzzyVariablePopularity)
                .setFuzzyVariableDuration(fuzzyVariableDuration)
                .setFuzzyWeights(fuzzyWeights);

        return new FuzzyProfile()
                .setName(FuzzyConstants.DEFAULT)
                .setEnableDebug(true)
                .setActive(isDefaultActive)
                .setFuzzyProfileData(fuzzyProfileData);
    }

    public String createFuzzyProfile(FuzzyProfileDto fuzzyProfileDto) {
        String error = this.fuzzyProfileValidator.validateForCreateFuzzyProfile(fuzzyProfileDto);
        if (error != null) {
            return error;
        }

        FuzzyProfile existingFuzzyProfile = this.fuzzyProfileRepository.findByName(fuzzyProfileDto.getName()).orElse(null);
        if (existingFuzzyProfile != null) {
            return "Profile with name %s already exists".formatted(fuzzyProfileDto.getName());
        }

        FuzzyProfile newFuzzyProfile = new FuzzyProfile()
                .setName(fuzzyProfileDto.getName())
                .setEnableDebug(fuzzyProfileDto.isEnableDebug())
                .setActive(fuzzyProfileDto.isActive())
                .setFuzzyProfileData(fuzzyProfileDto.getFuzzyProfileData());

        this.fuzzyProfileRepository.persist(newFuzzyProfile);

        return null;

    }
}