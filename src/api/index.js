import axios from 'axios';

const API_ENDPOINT = process.env.API_ENDPOINT;
const TILE_ENDPOINT = process.env.TILE_ENDPOINT;
const CLOUDSEARCH_ENDPOINT = process.env.CLOUDSEARCH_ENDPOINT;

export const exploracion = {
  getLayers: (locationType) => axios.get(`${API_ENDPOINT}/exploracion/layers`, {
    params: { locationType }
  }),
  getLocation: (locationType, id) => axios.get(`${API_ENDPOINT}/exploracion/location`, {
    params: { locationType, id }
  }),
  getSuggestions: str => axios.get(`${CLOUDSEARCH_ENDPOINT}`, {
    params: {
      q: `${str}*|${str}`,
      'q.parser': 'simple',
      'q.options': {
        'defaultOperator': 'and',
        'fields': ['nombre'],
        'operators': ['and', 'escape', 'fuzzy', 'near', 'not', 'or', 'phrase', 'precedence', 'prefix', 'whitespace']
      },
      return: '_all_fields,_score',
      sort: '_score desc',
      'highlight.nombre': {
        'max_phrases': 3,
        'format': 'text',
        'pre_tag': '*#*',
        'post_tag': '*%*'
      }
    }
  }),
  getVector: (field, locationType) => {
    return axios.get(`${API_ENDPOINT}/exploracion/test`, { 
      params: { locationType, field } 
    });
  }
};

export const monitoreo = {
  getVector: (caseID, index ) => axios.get(`${API_ENDPOINT}/monitor/vector`, {
    params: { caseID, index }
  }),
  getLocation: (locationType, id) => axios.get(`${API_ENDPOINT}/exploracion/location`, {
    params: { locationType, id }
  }),
};

export const ubicacion = {
  municipio: {
    getBasicInformation:    id => axios.get(`${API_ENDPOINT}/municipio/${id}/general`),
    getConevalInformation:  id => axios.get(`${API_ENDPOINT}/municipio/${id}/coneval`),
    getFeatures:            id => axios.get(`${API_ENDPOINT}/municipio/${id}/localidades`),
    getGeoJSON:             id => axios.get(`${API_ENDPOINT}/municipio/${id}/geojson`),
    getRiesgoMunicipio:     id => axios.get(`${API_ENDPOINT}/municipio/${id}/riesgo`),
    getCobertura:           id => axios.get(`${API_ENDPOINT}/municipio/${id}/cobertura`),
    getRecomendacion:       id => axios.get(`${API_ENDPOINT}/municipio/${id}/recomendacion`),
    getCoberturaDict:       id => axios.get(`${API_ENDPOINT}/informacion/cobertura`)
  },
  estado: {
    getBasicInformation:    id => axios.get(`${API_ENDPOINT}/estado/${id}/general`),
    getConevalInformation:  id => axios.get(`${API_ENDPOINT}/estado/${id}/coneval`),
    getFeatures:            id => axios.get(`${API_ENDPOINT}/estado/${id}/municipios`),
    getGeoJSON:             id => axios.get(`${API_ENDPOINT}/estado/${id}/geojson`),
    getRiesgoMunicipio:     id => axios.get(`${API_ENDPOINT}/estado/${id}/riesgo`),
    getCobertura:           id => axios.get(`${API_ENDPOINT}/estado/${id}/cobertura`),
    getRecomendacion:       id => axios.get(`${API_ENDPOINT}/estado/${id}/recomendacion`),
    getCoberturaDict:       id => axios.get(`${API_ENDPOINT}/informacion/cobertura`)

  }
};
