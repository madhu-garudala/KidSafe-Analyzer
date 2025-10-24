import React, { useState } from 'react';
import { configureAPIKeys } from '../services/api';

const APIConfig = ({ isInitialized, onInitialized }) => {
  const [openaiKey, setOpenaiKey] = useState('');
  const [langsmithKey, setLangsmithKey] = useState('');
  const [cohereKey, setCohereKey] = useState('');
  const [tavilyKey, setTavilyKey] = useState('');
  const [retrievalStrategy, setRetrievalStrategy] = useState('ensemble');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ message: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!openaiKey || !langsmithKey) {
      setStatus({
        message: 'Please provide both OpenAI and LangSmith API keys',
        type: 'error',
      });
      return;
    }

    setLoading(true);
    setStatus({ message: '', type: '' });

    try {
      const result = await configureAPIKeys({
        openai_api_key: openaiKey,
        langsmith_api_key: langsmithKey,
        cohere_api_key: cohereKey,
        tavily_api_key: tavilyKey,
        retrieval_strategy: retrievalStrategy,
      });

      if (result.success) {
        setStatus({ message: result.message, type: 'success' });
        onInitialized();
      } else {
        setStatus({ message: `Error: ${result.error}`, type: 'error' });
      }
    } catch (error) {
      setStatus({
        message: `Network error: ${error.message}`,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>🔑 API Configuration</h2>
        <p>Configure your API keys to enable ingredient analysis</p>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit} className="api-keys-form">
          <div className="form-group">
            <label htmlFor="openai-key">
              OpenAI API Key <span className="required">*</span>
            </label>
            <input
              type="password"
              id="openai-key"
              placeholder="sk-..."
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              disabled={isInitialized}
            />
          </div>

          <div className="form-group">
            <label htmlFor="langsmith-key">
              LangSmith API Key <span className="required">*</span>
            </label>
            <input
              type="password"
              id="langsmith-key"
              placeholder="ls_..."
              value={langsmithKey}
              onChange={(e) => setLangsmithKey(e.target.value)}
              disabled={isInitialized}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cohere-key">Cohere API Key</label>
            <input
              type="password"
              id="cohere-key"
              placeholder="For advanced retrieval"
              value={cohereKey}
              onChange={(e) => setCohereKey(e.target.value)}
              disabled={isInitialized}
            />
          </div>

          <div className="form-group">
            <label htmlFor="tavily-key">Tavily API Key</label>
            <input
              type="password"
              id="tavily-key"
              placeholder="For web search"
              value={tavilyKey}
              onChange={(e) => setTavilyKey(e.target.value)}
              disabled={isInitialized}
            />
          </div>

          <div className="form-group">
            <label htmlFor="retrieval-strategy">
              Retrieval Strategy <span className="required">*</span>
            </label>
            <select
              id="retrieval-strategy"
              className="strategy-select"
              value={retrievalStrategy}
              onChange={(e) => setRetrievalStrategy(e.target.value)}
              disabled={isInitialized}
            >
              <option value="ensemble">
                Ensemble (Recommended) - Combines multiple strategies
              </option>
              <option value="naive">
                Naive - Simple vector search (baseline)
              </option>
              <option value="bm25">BM25 - Keyword-based search</option>
              <option value="multi_query">
                Multi-Query - LLM query expansion
              </option>
              <option value="compression">
                Compression - Cohere reranking (requires Cohere key)
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="configure-btn"
            disabled={loading || isInitialized}
          >
            {loading ? (
              <>
                <span className="spinner small"></span> Initializing...
              </>
            ) : isInitialized ? (
              <>✓ System Initialized</>
            ) : (
              <>
                Initialize System <span className="btn-icon">🚀</span>
              </>
            )}
          </button>

          {status.message && (
            <div className={`status-message show ${status.type}`}>
              {status.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default APIConfig;

