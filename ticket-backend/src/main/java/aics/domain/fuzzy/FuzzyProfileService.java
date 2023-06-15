package aics.domain.fuzzy;

import aics.domain.fuzzy.constants.FuzzyConstants;
import aics.domain.fuzzy.etities.FuzzyProfile;
import aics.domain.fuzzy.models.*;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class FuzzyProfileService {

    public FuzzyProfile createDefaultProfile(boolean isDefaultActive) {
        FuzzyVariableYear fuzzyVariableYear = new FuzzyVariableYear(
                new FuzzyVariableDistributionPartTriangular(null, 1950, 2005),
                new FuzzyVariableDistributionPartTriangular(2000, 2010, 2015),
                new FuzzyVariableDistributionPartTriangular(2010, 2015, 2022),
                new FuzzyVariableDistributionPartTriangular(2020, 2030, null)
        );

        FuzzyVariableRating fuzzyVariableRating = new FuzzyVariableRating(
                new FuzzyVariableDistributionPartTrapezoidal(null, 1, 3, 5),
                new FuzzyVariableDistributionPartTrapezoidal(4, 5, 6, 7),
                new FuzzyVariableDistributionPartTrapezoidal(6, 7, 8, 9),
                new FuzzyVariableDistributionPartTrapezoidal(8, 9, 10, null)
        );

        FuzzyVariablePopularity fuzzyVariablePopularity = new FuzzyVariablePopularity(
                new FuzzyVariableDistributionPartTrapezoidal(null, 1, 20, 40),
                new FuzzyVariableDistributionPartTrapezoidal(30, 60, 90, 120),
                new FuzzyVariableDistributionPartTrapezoidal(100, 150, 200, 250),
                new FuzzyVariableDistributionPartTrapezoidal(200, 400, 600, null)
        );

        FuzzyVariableDuration fuzzyVariableDuration = new FuzzyVariableDuration(
                new FuzzyVariableDistributionPartTrapezoidal(null, 1, 20, 40),
                new FuzzyVariableDistributionPartTriangular(30, 60, 90),
                new FuzzyVariableDistributionPartTriangular(80, 120, 160),
                new FuzzyVariableDistributionPartTrapezoidal(140, 160, 300, null)
        );

        FuzzyWeights fuzzyWeights = new FuzzyWeights(
                new FuzzyVariableDistributionPartTriangular(null, 1, 3),
                new FuzzyVariableDistributionPartTriangular(2, 5, 7),
                new FuzzyVariableDistributionPartTriangular(6, 7, 8),
                new FuzzyVariableDistributionPartTriangular(7, 9, null)
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
}