import { exploracion as api } from 'app-api';
import {
  LOCATION_CHANGE,
  SET_SEARCH_VALUE,
  SET_MAP_CENTER,
  SET_SELECTED_LAYER,
  SET_LOCATION_TYPE,
  LAYER_VECTOR_REQUEST,
  LAYER_VECTOR_SUCCESS,
  LAYER_VECTOR_FAILURE,
  LAYERS_REQUEST,
  LAYERS_SUCCESS,
  LAYERS_FAILURE,
  SUGGESTIONS_REQUEST,
  SUGGESTIONS_SUCCESS,
  SUGGESTIONS_FAILURE,
  LOCATION_REQUEST,
  LOCATION_SUCCESS,
  LOCATION_FAILURE
} from '../constants';

export const setActiveTab = activeTab => {
  return { type: 'SET_ACTIVE_TAB', activeTab };
};

export const setSearchValue = searchValue => {
  return { type: SET_SEARCH_VALUE , searchValue };
};

export const setMapCenter = (latLng) => {
  return { type: SET_MAP_CENTER, latLng };
};

export const setSelectedLayer = (selectedLayer) => {
  return { type: SET_SELECTED_LAYER, selectedLayer };
};

export const setLocationType = (locationType) => {
  return dispatch => {
    dispatch(function() {
      return { type: SET_LOCATION_TYPE, locationType };
    }(locationType));
    dispatch(fetchLayers(locationType));
    dispatch(setSelectedLayer(null));
  };
};

export const setSelectedFeature = (locationType, id) => {

};

// START Layer Dictionary Fetch
export const fetchLayers = (locationType) => {
  return dispatch => {
    dispatch(layersRequest());
    return api.getLayers(locationType)
      .then(res => {
        const data = res.data;
        dispatch(layersSuccess(data));
      })
      .catch(err => {
        console.log(err);
        dispatch(layersFailure());
      });
  };
};
export const layersRequest = () => {
  return { type: LAYERS_REQUEST };
};
export const layersSuccess = (layers) => {
  return { type: LAYERS_SUCCESS, layers };
};
export const layersFailure = () => {
  return { type: LAYERS_FAILURE };
};
// END Layer Dictionary Fetch

// START Layer Vector Fetch
export const fetchLayerVector = (field, locationType) => {
  return dispatch => {
    dispatch(layerVectorRequest());
    return api.getVector(field, locationType)
      .then(res => {
        const data = res.data;
        dispatch(layerVectorSuccess(data));
      })
      .catch(err => {
        console.log(err);
        dispatch(layerVectorFailure());
      });
  };
};
export const layerVectorRequest = () => {
  return { type: LAYER_VECTOR_REQUEST };
};
export const layerVectorSuccess = (layerVector) => {
  return { type: LAYER_VECTOR_SUCCESS , layerVector };
};
export const layerVectorFailure = () => {
  return { type: LAYER_VECTOR_FAILURE };
};
// END Layer Vector Fetch

// Start Suggestions Fetch
export const fetchSuggestions = str => {
  return dispatch => {
    dispatch(suggestionsRequest());
    return api.getSuggestions(str)
      .then(res => {
        const data = res.data.hits.hit;
        dispatch(suggestionSuccess(data));
      })
      .catch(err => {
        dispatch(suggestionsFailure());
      });
  };
};
export const suggestionsRequest = () => {
  return { type: SUGGESTIONS_REQUEST };
};
export const suggestionSuccess = (suggestions) => {
  return { type: SUGGESTIONS_SUCCESS, suggestions};
};
export const suggestionsFailure = () => {
  return { type: SUGGESTIONS_FAILURE };
};
// End Suggestions Fetch

// Start Lcation Fetch
export const fetchLocation = (locationType, id, latlng) => {
  return dispatch => {
    dispatch(locationRequest());
    return api.getLocation(locationType, id)
      .then(res => {
        const data = res.data;
        dispatch(locationSuccess({...data, latlng }));
      })
      .catch(err => {
        console.log(err);
        dispatch(locationFailure());
      });
  };
};
export const locationRequest = () => {
  return { type: LOCATION_REQUEST };
};
export const locationSuccess = (selectedFeature) => {
  return { type: LOCATION_SUCCESS, selectedFeature};
};
export const locationFailure = () => {
  return { type: LOCATION_FAILURE };
};
// End Suggestions Fetch
