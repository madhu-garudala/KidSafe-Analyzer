import React, { useState, useEffect } from 'react';
import { getCereals, analyzeIngredients } from '../services/api';

const CerealSelector = ({ isEnabled, onCerealSelect, selectedCereal, onAnalysisComplete }) => {
  const [cereals, setCereals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Load cereals on mount
    loadCereals();
  }, []);

  const loadCereals = async () => {
    try {
      const data = await getCereals();
      setCereals(data);
    } catch (error) {
      console.error('Failed to load cereals:', error);
      showNotification('Failed to load cereals', 'error');
    }
  };

  const handleSelectChange = (e) => {
    const selectedBrand = e.target.value;
    if (selectedBrand) {
      const cereal = cereals.find((c) => c.brand === selectedBrand);
      onCerealSelect(cereal);
    } else {
      onCerealSelect(null);
    }
  };

  const handleAnalyze = async () => {
    if (!isEnabled) {
      showNotification('Please configure API keys first!', 'error');
      return;
    }

    if (!selectedCereal) {
      showNotification('Please select a cereal first!', 'error');
      return;
    }

    setAnalyzing(true);

    try {
      const result = await analyzeIngredients(
        selectedCereal.brand,
        selectedCereal.ingredients
      );

      if (result.success) {
        onAnalysisComplete(result);
        showNotification('Analysis complete!', 'success');
        
        // Scroll to results after a brief delay
        setTimeout(() => {
          const resultsCard = document.getElementById('results-card');
          if (resultsCard) {
            resultsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        showNotification(`Error: ${result.error}`, 'error');
      }
    } catch (error) {
      showNotification(`Network error: ${error.message}`, 'error');
    } finally {
      setAnalyzing(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <>
      <div
        className={`card ${!isEnabled ? 'disabled' : ''}`}
        style={!isEnabled ? { opacity: 0.5, pointerEvents: 'none' } : {}}
      >
        <div className="card-header">
          <h2>Select a Cereal Product</h2>
          <p>Choose from our database to analyze ingredients</p>
        </div>

        <div className="card-body">
          <div className="select-wrapper">
            <label htmlFor="cereal-select" className="select-label">
              <span className="label-icon">📦</span>
              Select Cereal Brand
            </label>
            <select
              id="cereal-select"
              className="cereal-select"
              onChange={handleSelectChange}
              value={selectedCereal?.brand || ''}
            >
              <option value="">-- Choose a cereal --</option>
              {cereals.map((cereal, index) => (
                <option key={index} value={cereal.brand}>
                  {cereal.brand}
                </option>
              ))}
            </select>
          </div>

          {selectedCereal && (
            <div className="selected-info">
              <div className="info-badge">
                <span className="badge-icon">✓</span>
                <span>{selectedCereal.brand}</span>
              </div>
              <button
                className="analyze-btn"
                onClick={handleAnalyze}
                disabled={analyzing}
              >
                {analyzing ? (
                  <>
                    <span className="spinner small"></span> Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Ingredients <span className="btn-icon">→</span>
                  </>
                )}
              </button>
            </div>
          )}

          {analyzing && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Analyzing ingredients... This may take up to 10 seconds</p>
            </div>
          )}
        </div>
      </div>

      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.message}
        </div>
      )}
    </>
  );
};

export default CerealSelector;

