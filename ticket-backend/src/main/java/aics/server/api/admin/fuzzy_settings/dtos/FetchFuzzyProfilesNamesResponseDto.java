package aics.server.api.admin.fuzzy_settings.dtos;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.List;

@Data
@Accessors(chain = true)
public class FetchFuzzyProfilesNamesResponseDto implements Serializable {
        List<String> fuzzyProfilesNames;
}
