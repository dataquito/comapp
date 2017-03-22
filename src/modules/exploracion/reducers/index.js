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

const defaultState = {
  colors: ['#15534C','#2B7157','#4F8E5A','#7DAA59','#B6C357','#F7D95D'],
  locationType: 1,
  selectedLayer: 'carencias_n_10',
  selectedFeature: null,
  layers: [],
  layersFailure: false,
  layersRequest: false,
  layerVector: [],
  layerVectorFailure: false,
  layerVectorRequest: false,
  searchValue: '',
  suggestions: [],
  mapCenter: [19.432904, -99.1568927],
  mapZoom: '',
  activeTab: 0
};

export default function exploracion(state = defaultState, action) {
  console.info('--'+action.type);


  switch(action.type) {
    // case LOCATION_CHANGE:
    //   console.log(action.payload.query);
    //   return { ...state, query: action.payload.query };
      // return { ...state, locationType: action.locationType };
    case SET_LOCATION_TYPE:
      // history.replace({ pathname: '/exploracion', query: { locationType: action.locationType } })
      // history.push({ pathname: '/the/path', query: { the: 'query' } })
      return { ...state, locationType: action.locationType };
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.activeTab };
    case SET_SELECTED_LAYER:
      return { ...state, selectedLayer: action.selectedLayer };
    case LAYERS_REQUEST:
      return { ...state, 
        layers: [],
        layersRequest: true,
        layersFailure: false
      };
    case LAYERS_SUCCESS:
      return { ...state,
        layers: action.layers,
        layersRequest: false,
        layersFailure: false
      };
    case LAYERS_FAILURE:
      return { ...state, 
        layers: [],
        layersRequest: false,
        layersFailure: true 
      };
    case LAYER_VECTOR_REQUEST:
      return { ...state, 
        layerVector: [],
        layerVectorRequest: true,
        layerVectorFailure: false
      };
    case LAYER_VECTOR_SUCCESS:
      return { ...state,
        layerVector: action.layerVector,
        layerVectorRequest: false,
        layerVectorFailure: false
      };
    case LAYER_VECTOR_FAILURE:
      return { ...state, 
        layerVector: [],
        layerVectorRequest: false,
        layerVectorFailure: true 
      };
    case SUGGESTIONS_REQUEST:
      return { ...state, 
        suggestions: []
      };
    case SUGGESTIONS_SUCCESS:
      return { ...state,
        suggestions: action.suggestions
      };
    case SUGGESTIONS_FAILURE:
      return { ...state, 
        suggestions: []
      };
    case SET_MAP_CENTER:
      return { ...state, 
        mapCenter: action.latLng
      };
    case SET_SEARCH_VALUE:
      return { ...state, 
        searchValue: action.searchValue
      };
    case LOCATION_REQUEST:
      return { ...state, 
        selectedFeature: null
      };
    case LOCATION_SUCCESS:
      return { ...state,
        selectedFeature: action.selectedFeature
      };
    case LOCATION_FAILURE:
      return { ...state, 
        selectedFeature: null
      };
    default:
      return state;
  }
}

