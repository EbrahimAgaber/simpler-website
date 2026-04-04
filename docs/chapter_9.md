# Chapter 9: Model Validation, Uncertainty, and

Interpretability
9.1 Introduction
Machine learning models are increasingly used to support decision-making in chemical engineering
applications, including process optimization, fault detection, and yield prediction. However, a
model that performs well on historical data does not necessarily provide reliable predictions in real
operating conditions.
Model validation and uncertainty quantification are therefore critical. In chemical processes, incorrect
predictions can lead to unsafe operation, economic losses, or regulatory non-compliance. In addition,
engineers must be able to understand why a model makes a certain prediction, particularly when
models are used to guide operational or design decisions.
This chapter introduces the principles of model validation, uncertainty assessment, and interpretabil-
ity, emphasizing their importance in trustworthy and deployable machine learning models for
chemical engineering.
9.2 Conceptual Foundations
9.2.1 Overfitting and Underfitting
A fundamental challenge in model development is balancing model complexity and generalization.
• Underfitting occurs when a model is too simple to capture the underlying relationship
between inputs and outputs.
• Overfitting occurs when a model fits noise in the training data rather than the true process
behavior.
Mathematically, the expected prediction error can be decomposed into bias and variance:
𝐸[(𝑦 − ̂ 𝑦)2] = 𝐵𝑖𝑎𝑠 2 + 𝑉 𝑎𝑟𝑖𝑎𝑛𝑐𝑒 + 𝑁 𝑜𝑖𝑠𝑒
Chemical engineering datasets often contain noise from sensors, disturbances, and unmeasured
variables, making overfitting a serious concern.
63
9.2.2 Cross-Validation
Cross-validation provides a systematic way to estimate a model’s ability to generalize to unseen
data.
In 𝑘-fold cross-validation, the dataset is divided into 𝑘 subsets. The model is trained on 𝑘 − 1 folds
and evaluated on the remaining fold. This process is repeated 𝑘 times, and performance metrics are
averaged:
𝐶𝑉 𝐸𝑟𝑟𝑜𝑟 = 1
𝑘
𝑘
∑
𝑖=1
𝐸𝑖
where 𝐸𝑖 is the error on the 𝑖-th validation fold.
Cross-validation is particularly important in chemical engineering, where datasets may be small or
expensive to generate.
9.2.3 Model Interpretability
Interpretability refers to the ability to explain how input variables influence model predictions.
Interpretability is critical in process engineering because:
• Models must align with physical intuition.
• Engineers need to verify that predictions are physically reasonable.
• Regulatory and safety requirements demand transparency.
Common interpretability approaches include:
• Feature importance analysis
• Partial dependence plots
• Sensitivity analysis
Interpretable models allow engineers to assess whether a model has learned meaningful process
relationships or spurious correlations.
9.3 Python Implementation
9.3.1 Evaluating Regression and Classification Models
We demonstrate validation techniques using synthetic process data.
64
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.metrics import mean_squared_error, accuracy_score
## Regression Model Validation
np.random.seed(0)
X = np.random.rand(200, 3)
y = 10 + 5*X[:,0] - 3*X[:,1] + np.random.normal(0, 0.5, size =200)
model = LinearRegression()
cv_mse = -cross_val_score(
model, X, y, cv =5, scoring ="neg_mean_squared_error"
)
cv_mse.mean()
0.2569785817465236
Cross-validation provides a robust estimate of prediction error, reducing reliance on a single train–test
split.
# Classification Model Validation
X_class = np.random.rand(200, 2)
y_class = (X_class[:,0] + X_class[:,1] > 1).astype(int)
clf = LogisticRegression()
clf.fit(X_class, y_class)
y_pred = clf.predict(X_class)
accuracy_score(y_class, y_pred)
0.965
For classification tasks, accuracy, precision, recall, and confusion matrices should be evaluated
together to avoid misleading conclusions.
9.4 Engineering Case Study
9.4.1 Quantifying Uncertainty in Predicted Reactor Yields
Consider a reactor where product yield depends on temperature, residence time, and feed composition.
A regression model is trained to predict yield, but engineers must understand the confidence in
65
these predictions.
After fitting a regression model, uncertainty can be assessed by analyzing prediction residuals and
their variance:
𝜎2 = 1
𝑁
𝑁
∑
𝑖=1
(𝑦𝑖 − ̂ 𝑦𝑖)2
Higher uncertainty may indicate:
• Insufficient data in certain operating regions
• Missing input variables
• Regime changes in process behavior
Quantifying uncertainty allows engineers to:
• Define safety margins
• Identify unreliable predictions
• Prioritize additional data collection
9.5 Chapter Summary
This chapter emphasized the importance of validating and interpreting machine learning models in
chemical engineering applications. Key topics included:
• The risks of overfitting and underfitting
• Cross-validation as a robust performance evaluation tool
• The need for interpretability in engineering decision-making
• Practical validation of regression and classification models
• Quantifying uncertainty in reactor yield predictions
Robust validation and transparent models are essential for deploying machine learning safely and
effectively in real chemical processes.
66