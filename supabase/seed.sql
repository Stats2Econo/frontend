-- Optional: starter courses taken from the current website.
-- Run in Supabase -> SQL Editor after 0001_init.sql. Enrollment starts closed: set the price and turn on "Enrollment open" for each course in the admin panel.

insert into public.courses
  (slug, title, short_description, software, schedule, price_inr, syllabus, is_published, is_featured, enrollment_open, sort_order)
values
  (
    'nsso-unit-level-data',
    'NSSO Unit-Level Data Utilization',
    'Live course on the complete process of extracting and using unit-level micro-data of Indian National Sample Survey (NSSO) and PLFS surveys using STATA.',
    'STATA',
    'Mon to Thu, 7:00 PM - 8:30 PM IST',
    0,
    array[
      'Survey architecture, rounds design, schedules, and questionnaires',
      'Extracting fixed-width ASCII text data using STATA infile/dictionaries',
      'Merging household, enterprise, and person-level data blocks',
      'Applying multiplier weights for state and national estimation',
      'Replicating published empirical papers and constructing indicators'
    ],
    true, true, false, 1
  ),
  (
    'basic-econometric-analysis',
    'Basic Econometric Analysis',
    'Live course on theoretical and applied basic econometrics using STATA, covering classical linear regression and diagnostic testing.',
    'STATA', '', 0,
    array[
      'Classical linear regression model (OLS) mechanics and assumptions',
      'Hypothesis testing, t-statistics, F-tests, and goodness of fit',
      'Diagnostic tests: heteroskedasticity, multicollinearity, autocorrelation',
      'Dummy variables, interaction terms, and structural breaks',
      'Model specification and reporting regression tables for publication'
    ],
    true, false, false, 2
  ),
  (
    'advanced-econometric-analysis',
    'Advanced Econometric Analysis',
    'Live course on theoretical and applied advanced econometric models with STATA, focusing on panel data and microeconometrics.',
    'STATA', '', 0,
    array[
      'Static panel data: pooled OLS, fixed effects & random effects',
      'Hausman specification test and cluster-robust standard errors',
      'Endogeneity: omitted variables, simultaneity, measurement error',
      'Instrumental variables (IV / 2SLS) and GMM estimation',
      'Binary dependent variables: logit, probit, and tobit models'
    ],
    true, false, false, 3
  ),
  (
    'time-series-analysis',
    'Time Series Analysis',
    'Live course on theoretical and applied time series analysis and empirical forecasting with STATA & R.',
    'STATA & R', '', 0,
    array[
      'Stationarity, ACF/PACF, and unit root tests',
      'ARIMA & seasonal ARIMA modelling and forecasting',
      'Vector autoregression (VAR) & Granger causality',
      'Cointegration (Johansen / Engle-Granger) & VECM',
      'Volatility modelling with ARCH and GARCH'
    ],
    true, false, false, 4
  ),
  (
    'statistical-analysis',
    'Statistical Analysis',
    'Live course on theoretical and applied statistical analysis for health, business, and economics using STATA & R.',
    'STATA & R', '', 0,
    array[
      'Descriptive statistics, exploratory data analysis, and visualization',
      'Sampling distributions, central limit theorem, and confidence intervals',
      'Parametric hypothesis tests: one-sample, two-sample, and paired t-tests',
      'Analysis of variance (ANOVA) and non-parametric alternatives',
      'Correlation, chi-square test of independence, and cross-tabulations'
    ],
    true, false, false, 5
  )
on conflict (slug) do nothing;
