import React, { PropTypes } from 'react';

const LayerList = ({ data, activeLayer, onChange }) => {
  const values = data.values;
  return (
    <aside className="menu">
        {
          values.map((layer, indexLayer) => {
            return (
              <ul key={layer.key + indexLayer} className="menu-list">
                <li>
                  <label className="">{layer.key}</label>
                  <ul>
                    {
                      layer.values.sort((a, b) => b.periodo - a.periodo).map((periodo, periodoIndex) => {
                        const isActive = periodo.id === activeLayer;
                        const className = isActive ? 'is-active' : '';
                        return (
                          <li key={`${periodoIndex}-${periodo.key}`}>
                            <label className={className}>
                              <input 
                                style={{ display: 'none' }}
                                type="radio"
                                onChange={onChange}
                                name={'period__layer'} 
                                value={periodo.id}/>
                              {periodo.periodo}
                            </label>
                          </li>
                        );
                      })
                    }
                  </ul>
                </li>
              </ul>
            );
          })
        }
    </aside>
  );
};

export default LayerList;
