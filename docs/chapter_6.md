# Chapter 6: Dimensionality Reduction and

Principal Component Analysis (PCA)
6.1 Introduction
High-dimensional process data are increasingly common in chemical engineering due to the prolifer-
ation of sensors, analyzers, and advanced process control systems. While large datasets enable more
detailed monitoring and analysis, they also introduce challenges:
• Computational inefficiency when working with many correlated variables
• Difficulty in visualizing relationships in more than three dimensions
• Risk of overfitting in predictive models
Dimensionality reduction provides a solution by transforming high-dimensional data into a smaller set
of variables that capture the essential variation while discarding redundancy. Principal Component
Analysis (PCA) is the most widely used technique for this purpose.
6.1.1 Motivation: Dealing with High-Dimensional Process Data
In chemical processes, multiple measurements such as temperatures, pressures, flow rates, composi-
tions, and sensor readings often exhibit strong correlations due to underlying physical laws:
• Material and energy balances link flow rates, concentrations, and temperatures
• Sensor arrays measuring the same process variable may have redundant readings
• Process control loops introduce dependencies among variables
Analyzing such datasets directly is challenging:
• Multicollinearity can distort regression or classification models
• Visualization becomes impractical beyond three dimensions
• Computational cost rises with the number of variables
PCA addresses these issues by constructing orthogonal linear combinations of the original variables
that capture the maximum variance in the data. These combinations, called principal components,
reduce dimensionality while preserving as much information as possible.
45
6.2 Conceptual Foundations
PCA seeks a set of new variables 𝑧1, 𝑧2, … , 𝑧𝑚 such that: 1. each 𝑧𝑖 is a linear combination of the
original variables:
𝑧𝑖 = w⊤
𝑖 x = 𝑤 𝑖1𝑥1 + 𝑤𝑖2𝑥2 + ⋯ + 𝑤𝑖𝑝𝑥𝑝
2. The first principal component 𝑧1 captures the maximum variance in the dataset.
3. Each subsequent component captures the maximum remaining variance while being orthogonal
to all previous components.
This orthogonality ensures that principal components are uncorrelated, addressing multicollinearity
and redundancy in process datasets.
The proportion of total variance explained by each component quantifies how much of the dataset’s
information is retained:
Variance Explained = Variance of component
Total variance of all variables
By selecting the first few components that explain most of the variance, engineers can reduce the
number of variables while retaining meaningful process information.
6.3 Mathematical Formulation
Let X ∈ ℝ 𝑛×𝑝 denote a matrix of 𝑛 observations and 𝑝 standardized process variables. The steps of
PCA are:
1. Standardization: Subtract the mean and scale each variable to unit variance.
𝑋scaled
𝑖𝑗 = 𝑋𝑖𝑗 − ̄𝑋𝑗
𝜎𝑗
2. Covariance Matrix Calculation :
C = 1
𝑛 − 1 X⊤X
Each entry 𝐶𝑖𝑗 represents the covariance between variables 𝑖 and 𝑗.
3. Eigenvalue Decomposition : Solve
Cw𝑖 = 𝜆 𝑖w𝑖
where 𝜆𝑖 is the variance explained by principal component 𝑖, and w𝑖 is the corresponding eigenvector
defining the linear combination.
46
4. Projection onto Principal Components :
Z = XW
where Z contains the principal component scores for each observation, and W is the matrix of
eigenvectors.
The eigenvectors with the largest eigenvalues define the principal components that capture the
most variance. The cumulative explained variance guides the selection of how many components to
retain.
6.4 Python Implementation
6.4.1 PCA on Synthetic Multivariable Process Dataset
We create a synthetic dataset simulating correlated sensor readings from a chemical reactor. The
dataset contains temperature, pressure, flow rate, and concentration measurements with physically
realistic correlations.
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
np.random.seed(42)
n_samples = 250
# Synthetic correlated process variables
temperature = np.random.normal(350, 10, n_samples)
pressure = 5 + 0.02 * temperature + np.random.normal(0, 0.5, n_samples)
flow_rate = 100 + 0.1 * temperature + np.random.normal(0, 5, n_samples)
concentration = np.random.uniform(0.5, 1.5, n_samples)
data = pd.DataFrame({
"Temperature": temperature,
"Pressure": pressure,
"FlowRate": flow_rate,
"Concentration": concentration
})
data.head()
47
Temperature Pressure FlowRate Concentration
0 354.967142 11.468901 140.127602 0.788694
1 348.617357 12.431278 144.408819 0.855673
2 356.476885 13.190616 128.654851 1.219046
3 365.230299 12.820839 139.337876 0.797122
4 347.658466 11.193484 131.512634 1.066405
# Standardize data
scaler = StandardScaler()
scaled_data = scaler.fit_transform(data)
# Apply PCA
pca = PCA()
principal_components = pca.fit_transform(scaled_data)
# Variance explained by each component
explained_variance = pca.explained_variance_ratio_
explained_variance
array([0.36804611, 0.26566817, 0.20840837, 0.15787735])
# Scree plot to visualize variance explained
plt.figure()
plt.plot(np.cumsum(explained_variance)*100, marker ='o')
plt.xlabel("Number of Principal Components" )
plt.ylabel("Cumulative Variance Explained (%)" )
plt.title("PCA Scree Plot" )
plt.grid(True)
plt.show()
48
6.5 Engineering Case Study
6.5.1 Reducing Dimensionality of Sensor Data from a Chemical Reactor
Consider a continuous stirred-tank reactor (CSTR) monitored by multiple temperature, pressure, flow,
and concentration sensors. Redundant and correlated measurements increase data dimensionality
without providing new information.
PCA enables engineers to:
• Reduce the number of input variables for downstream modeling (e.g., regression or control)
• Identify dominant modes of process variability
• Visualize high-dimensional process behavior in 2–3 principal component space
In our synthetic example, the first two principal components capture over 90% of the total variance.
Projecting the original sensor readings onto these components simplifies visualization and highlights
patterns in operating conditions, such as periods of high throughput or temperature excursions.
49
6.6 Chapter Summary
This chapter introduced Principal Component Analysis (PCA) as a method for dimensionality
reduction in high-dimensional chemical engineering datasets. The mathematical formulation,
including covariance matrices, eigenvalues, and eigenvectors, was presented with step-by-step
derivation. Through synthetic reactor sensor data, PCA demonstrated its ability to identify
dominant modes of variability, reduce data dimensionality, and support subsequent modeling and
visualization efforts. By focusing on physically meaningful components, engineers can simplify
complex datasets while preserving essential process information.
50