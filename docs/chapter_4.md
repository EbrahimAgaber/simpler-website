# Chapter 4: Classification for Process Stability

4.1 Introduction
Chemical reactors and process units often operate under conditions that can be broadly categorized as
stable or unstable. Stability is critical for safety, product quality, and process efficiency. Classifying
operating regimes allows engineers to:
• Predict when a process might deviate from safe operating limits
• Implement preventative control strategies
• Optimize process performance without violating operational constraints
Machine learning classification provides a systematic framework for identifying these regimes from
historical operating data.
4.1.1 Importance of Classifying Operating Conditions as Stable/Unstable
Traditional process control relies on deterministic models or expert rules to define stability limits.
However, many modern processes are complex, nonlinear, or subject to disturbances that make
explicit thresholds insufficient. Classification models enable:
• Data-driven stability prediction: Automatically detect conditions leading to unsafe or
inefficient operation.
• Early warning systems: Trigger alarms or corrective actions before instability manifests.
• Design insights: Identify combinations of variables most critical to stability.
In chemical engineering, stability classification is applied to reactor temperature oscillations, con-
centration swings, flow instabilities, and phase separation regimes.
4.2 Conceptual Foundations
4.2.1 Logistic Regression
Logistic regression models the probability of a binary outcome (e.g., stable vs unstable):
𝑃 (𝑌 = 1 ∣ 𝑋) = 1
1 + 𝑒−(𝛽0+𝛽1𝑋1+...+𝛽𝑝𝑋𝑝)
• 𝑌 = 1 for unstable, 𝑌 = 0 for stable
• Coefficients 𝛽𝑖 represent the log-odds effect of each variable
• Suitable when the relationship between predictors and log-odds is approximately linear
33
4.2.2 Decision Trees
Decision trees classify data by sequentially splitting variables based on information gain or Gini
impurity:
• Each node represents a variable threshold
• Leaves represent class predictions
• Highly interpretable for process engineers, as paths correspond to operating rules
4.2.3 Random Forests
Random forests combine multiple decision trees to improve predictive performance:
• Reduces overfitting inherent in single trees
• Aggregates predictions via majority voting
• Still interpretable using feature importance metrics
4.2.4 Evaluation Metrics: Confusion Matrix
A confusion matrix summarizes classification performance:
Predicted Stable Predicted Unstable
Actual Stable True Negative (TN) False Positive (FP)
Actual Unstable False Negative (FN) True Positive (TP)
Metrics derived:
• Accuracy: 𝑇 𝑃 +𝑇 𝑁
𝑇 𝑃 +𝑇 𝑁+𝐹 𝑃 +𝐹 𝑁
• Precision: 𝑇 𝑃
𝑇 𝑃 +𝐹 𝑃
• Recall (Sensitivity): 𝑇 𝑃
𝑇 𝑃 +𝐹 𝑁
• F1 Score: Harmonic mean of precision and recall
## Implementation: Synthetic Dataset of Reactor Operating Conditions
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix, classification_report
# Generate synthetic reactor data
np.random.seed(42)
n_samples = 200
34
temperature = np.random.normal(350, 10, n_samples)
pressure = np.random.normal(5.0, 0.5, n_samples)
feed_conc = np.random.normal(2.0, 0.2, n_samples)
# Define stability condition (arbitrary physical rule)
# Unstable if temperature > 360 K or feed concentration < 1.8 mol/L
stability = ((temperature > 360) | (feed_conc < 1.8)).astype(int) # 1 = Unstable, 0 = Stable
# Create DataFrame
reactor_data = pd.DataFrame({
"Temperature_K": temperature,
"Pressure_bar": pressure,
"Feed_Conc_mol_L": feed_conc,
"Stable": 1 - stability # 1 = Stable, 0 = Unstable
})
# Train-test split
X = reactor_data[["Temperature_K", "Pressure_bar", "Feed_Conc_mol_L"]]
y = reactor_data["Stable"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size =0.2, random_state =42)
#Logistic Regression
# Logistic regression
log_model = LogisticRegression()
log_model.fit(X_train, y_train)
y_pred_log = log_model.predict(X_test)
# Evaluation
conf_matrix_log = confusion_matrix(y_test, y_pred_log)
report_log = classification_report(y_test, y_pred_log)
conf_matrix_log, report_log
(array([[ 4, 3],
[ 1, 32]], dtype=int64),
' precision recall f1-score support\n\n 0 0.80 0.57 0.67 7\n 1 0.91 0.97 0.94 33\n\n accuracy 0.90 40\n macro avg 0.86 0.77 0.80 40\nweighted avg 0.89 0.90 0.89 40\n')
Interpretation:
Each coefficient indicates the effect of a process variable on the probability of stability.
Confusion matrix highlights how many stable and unstable points were correctly classified.
# Decision Tree Classification
tree_model = DecisionTreeClassifier(max_depth=3, random_state =42)
tree_model.fit(X_train, y_train)
y_pred_tree = tree_model.predict(X_test)
35
conf_matrix_tree = confusion_matrix(y_test, y_pred_tree)
report_tree = classification_report(y_test, y_pred_tree)
conf_matrix_tree, report_tree
(array([[ 7, 0],
[ 0, 33]], dtype=int64),
' precision recall f1-score support\n\n 0 1.00 1.00 1.00 7\n 1 1.00 1.00 1.00 33\n\n accuracy 1.00 40\n macro avg 1.00 1.00 1.00 40\nweighted avg 1.00 1.00 1.00 40\n')
Insights:
• Tree structure can be visualized to extract if-then rules, e.g., “If temperature > 358 K and
feed < 1.85 → Unstable” .
• Highly interpretable for process engineers.
# Random forest
rf_model = RandomForestClassifier(n_estimators=100, random_state =42)
rf_model.fit(X_train, y_train)
y_pred_rf = rf_model.predict(X_test)
conf_matrix_rf = confusion_matrix(y_test, y_pred_rf)
report_rf = classification_report(y_test, y_pred_rf)
conf_matrix_rf, report_rf
(array([[ 7, 0],
[ 0, 33]], dtype=int64),
' precision recall f1-score support\n\n 0 1.00 1.00 1.00 7\n 1 1.00 1.00 1.00 33\n\n accuracy 1.00 40\n macro avg 1.00 1.00 1.00 40\nweighted avg 1.00 1.00 1.00 40\n')
Insights:
• Ensemble reduces overfitting compared to a single decision tree
• Feature importance identifies which variables most affect stability
# Feature importance
import matplotlib.pyplot as plt
importance = rf_model.feature_importances_
plt.bar(X.columns, importance)
plt.ylabel("Importance")
plt.title("Feature Importance for Reactor Stability" )
plt.show()
36
4.3 Engineering Case Study: Classifying Stable vs Unstable Chemical
Reactors
Scenario:
A continuous stirred-tank reactor (CSTR) exhibits oscillations at high temperatures or low feed
concentrations. Historical data from the plant are synthesized as above.
Steps:
• Data generation: Representative of plant conditions
• Model selection: Logistic regression for interpretability; random forest for predictive accuracy
• Evaluation: Confusion matrix and classification report
• Interpretation: Identify safe operating regions and critical variables
• Outcome: Engineers can use ML classification to implement:
– Preventive alarms if temperature or feed deviates into unstable regimes
– Operational guidelines for robust reactor performance
– Variable prioritization based on feature importance
4.4 Chapter Summary
• Stability classification is vital for safe and efficient process operation.
37
• Logistic regression provides interpretable probabilities; decision trees offer rule-based classifi-
cation; random forests improve predictive performance.
• Confusion matrices, precision, recall, and F1 scores quantify model reliability.
• Synthetic reactor datasets illustrate how ML identifies stable vs unstable regimes.
• This chapter prepares the foundation for unsupervised learning and clustering, where process
patterns are discovered without predefined labels.
38