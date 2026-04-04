# Chapter 3: Regression Techniques for Process

Modeling
3.1 Introduction
Regression is a cornerstone of data-driven modeling in chemical engineering. It provides a quanti-
tative framework to relate process inputs—such as temperatures, pressures, flow rates, and feed
compositions—to outputs like product yield, heat exchanger performance, or reactor conversion.
While first-principles models capture the mechanistic basis of chemical processes, regression enables
engineers to identify empirical relationships when the system is too complex for analytical solutions
or when high-dimensional process data are available.
The objective of this chapter is to provide a rigorous introduction to regression techniques, em-
phasizing both conceptual understanding and practical implementation using Python. Engineers
will learn how to model process variables, interpret coefficients in physical terms, and evaluate the
reliability of regression predictions.
3.2 Role of Regression in Predicting Process Variables
Regression models serve several engineering purposes:
• Process understanding: Quantifying the effect of key variables on process performance.
• Prediction: Estimating outputs under untested operating conditions.
• Optimization: Identifying combinations of inputs that maximize or minimize a desired
response.
• Diagnostics: Detecting anomalies or outliers in plant operations.
Unlike black-box methods, regression allows interpretable relationships, where each coefficient
reflects a measurable effect of an input variable on the output. This transparency is critical in
chemical engineering applications, where safety, regulatory compliance, and physical plausibility are
paramount.
3.3 Conceptual Foundations
3.3.1 Linear Regression
Linear regression models the relationship between one or more independent variables 𝑋1, 𝑋2, ..., 𝑋𝑝
and a dependent variable 𝑌 as a linear combination:
27
𝑌 = 𝛽 0 + 𝛽1𝑋1 + 𝛽2𝑋2 + ... + 𝛽𝑝𝑋𝑝 + 𝜀
Where:
• 𝛽0 is the intercept
• 𝛽𝑖 are coefficients representing the effect of each variable
• 𝜀 is the residual error
Assumptions:
• Linearity: the relationship between inputs and output is linear.
• Independence: observations are independent.
• Homoscedasticity: residuals have constant variance.
• Normality: residuals are approximately normally distributed.
• No multicollinearity among predictors.
3.3.2 Multivariate Regression
Chemical processes often involve multiple interacting variables. Multivariate regression accounts for
these interactions, allowing simultaneous modeling of temperature, pressure, and composition effects.
Correlations between input variables must be carefully interpreted to avoid confounded estimates.
Physical interpretation example:
A coefficient 𝛽Temp = 0.1 implies that increasing reactor temperature by 1 K increases yield by 0.1%,
holding other variables constant.
3.3.3 Mathematical Formulation: Ordinary Least Squares (OLS)
OLS regression estimates coefficients 𝛽 by minimizing the sum of squared errors between predicted
and observed outputs:
min
𝛽
𝑛
∑
𝑖=1
(𝑦𝑖 − ̂ 𝑦𝑖)2 = min
𝛽
𝑛
∑
𝑖=1
(𝑦𝑖 − (𝛽0 +
𝑝
∑
𝑗=1
𝛽𝑗𝑥𝑖𝑗))
2
Step-by-step derivation:
1. Represent data in matrix form:
𝑌 = 𝑋𝛽 + 𝜀
• 𝑌 is an 𝑛 × 1 vector of outputs
• 𝑋 is an 𝑛 × (𝑝 + 1)matrix of predictors (including a column of ones for the intercept)
• 𝛽 is a (𝑝 + 1) × 1vector of coefficients
2. Define the cost function:
28
𝐽 (𝛽) = (𝑌 − 𝑋𝛽)𝑇(𝑌 − 𝑋𝛽)
3. Minimize 𝐽 (𝛽)with respect to 𝛽 by setting the derivative to zero:
𝜕𝐽
𝜕𝛽 = −2𝑋 𝑇(𝑌 − 𝑋𝛽) = 0
4. Solve for 𝛽:
̂𝛽 = (𝑋𝑇𝑋)−1𝑋𝑇𝑌
This closed-form solution is the foundation for linear regression and is implemented efficiently in
Python libraries such as scikit-learn.
## Python Implementation: Regression on hypothetical Reaction Yield Data
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
# Generate synthetic process data
np.random.seed(0)
n_samples = 100
temperature = np.random.normal(350, 10, n_samples)
pressure = np.random.normal(5.0, 0.5, n_samples)
feed_conc = np.random.normal(2.0, 0.2, n_samples)
# Nonlinear relationship for realistic behavior
yield_percent = (
70
+ 0.1 * (temperature - 350)
+ 2.0 * (pressure - 5.0)
- 5.0 * (feed_conc - 2.0)**2
+ np.random.normal(0, 1.0, n_samples)
)
# Create DataFrame
data = pd.DataFrame({
"Temperature_K": temperature,
"Pressure_bar": pressure,
"Feed_Conc_mol_L": feed_conc,
"Yield_percent": yield_percent
})
# Split data into training and test sets
29
X = data[["Temperature_K", "Pressure_bar", "Feed_Conc_mol_L"]]
y = data["Yield_percent"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size =0.2, random_state =42)
# Fit linear regression
model = LinearRegression()
model.fit(X_train, y_train)
# Predict
y_pred = model.predict(X_test)
# Evaluate
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
model.coef_, model.intercept_, mse, r2
(array([0.08142666, 2.30807222, 1.07932153]),
27.472193051256895,
1.062507184391023,
0.7368195095705561)
3.4 Interpretation
• Coefficients quantify the effect of each process variable.
• 𝑅2 indicates how well the model explains variance in reactor yield.
• Mean squared error provides an absolute measure of predictive accuracy.
3.5 Engineering Case Study: Predicting Heat Exchanger Performance
3.5.1 Problem Formulation
A heat exchanger’s outlet temperature depends on inlet temperatures, flow rates, and material
properties. Using synthetic data, we aim to predict outlet temperature as a function of:
• Hot stream flow rate 𝐹ℎ
• Cold stream flow rate 𝐹𝑐
• Inlet temperatures 𝑇in,ℎ and 𝑇in,𝑐
# Synthetic heat exchanger data
np.random.seed(2)
n_samples = 80
F_h = np.random.uniform(1.0, 5.0, n_samples) # kg/s
F_c = np.random.uniform(1.0, 5.0, n_samples) # kg/s
30
T_in_h = np.random.uniform(350, 400, n_samples) # K
T_in_c = np.random.uniform(300, 350, n_samples) # K
# Outlet temperature (synthetic model)
T_out_h = T_in_h - 0.1*(F_h - F_c) + 0.05*(T_in_c - 325) + np.random.normal(0, 0.5, n_samples)
hx_data = pd.DataFrame({
"F_h": F_h,
"F_c": F_c,
"T_in_h": T_in_h,
"T_in_c": T_in_c,
"T_out_h": T_out_h
})
# Regression model
X_hx = hx_data[["F_h", "F_c", "T_in_h", "T_in_c"]]
y_hx = hx_data["T_out_h"]
model_hx = LinearRegression()
model_hx.fit(X_hx, y_hx)
# Prediction
y_hx_pred = model_hx.predict(X_hx)
r2_score(y_hx, y_hx_pred)
0.9987811136397328
3.6 Insights
• Linear regression captures the main dependencies of outlet temperature on flow rates and
inlet temperatures.
• Coefficients can be interpreted physically to inform process adjustments.
• Residuals indicate the accuracy and highlight nonlinearities if present.
3.7 Chapter Summary
• Regression provides a transparent framework to relate process variables to outputs.
• Linear and multivariate regression allow engineers to quantify effects and make predictions
with physical interpretability.
• Ordinary least squares provides a mathematically rigorous method to estimate model coeffi-
cients.
• Python with NumPy, Pandas, and scikit-learn enables efficient data handling, model training,
and evaluation.
• Synthetic datasets demonstrate realistic chemical engineering applications, including reactor
yields and heat exchanger performance.
31
• This chapter lays the foundation for classification of process stability, which will be explored
in the next chapter (Chapter 4).
32