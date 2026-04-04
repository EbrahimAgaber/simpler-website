# Chapter 5: Clustering Process Conditions

5.1 Introduction
Chemical engineering systems generate high-dimensional operating data from sensors, analyzers, and
control systems. Unlike regression or classification problems, many engineering tasks arise when no
explicit output variable is defined. The objective is to understand how operating conditions organize
themselves, whether distinct regimes exist, and how these regimes relate to process performance
and stability.
Clustering provides a mathematical framework to address these questions by grouping observations
according to similarity in multivariable space. In chemical engineering, clustering is primarily an
exploratory and diagnostic tool, supporting operating regime identification, process monitoring, and
early fault detection. Importantly, clustering complements first-principles modeling by revealing
structure that may not be apparent through mechanistic analysis alone.
5.2 Use of Clustering to Identify Patterns in Multivariable Process Data
Process data typically consist of simultaneous measurements of temperatures, pressures, flow rates,
and compositions. These variables are often correlated through material and energy balances,
transport phenomena, and control actions. Consequently, patterns in process behavior are inherently
multivariate.
Clustering enables engineers to identify groups of operating points that are similar across all variables.
Such patterns may correspond to:
• Distinct throughput levels
• Energy-efficient versus energy-intensive operation
• Stable steady states versus transitional regimes
From an engineering perspective, clustering is valuable because it operates directly on measured
data without requiring explicit assumptions about underlying kinetics or transport mechanisms.
However, the resulting clusters must always be interpreted through physical reasoning and process
constraints.
39
5.3 Conceptual Foundations
Clustering algorithms represent each operating condition as a point in a multidimensional feature
space. Let an operating dataset consist of (𝑛)observations, each described by (𝑝)process variables.
The data matrix can be written as:
X =
⎡
⎢⎢
⎣
𝑥11 𝑥12 ⋯ 𝑥 1𝑝
𝑥21 𝑥22 ⋯ 𝑥 2𝑝
⋮ ⋮ ⋱ ⋮
𝑥𝑛1 𝑥𝑛2 ⋯ 𝑥 𝑛𝑝
⎤
⎥⎥
⎦
Each row corresponds to one operating condition, and similarity between observations is typically
quantified using a distance metric, most commonly the Euclidean distance. Prior to clustering,
variables must be scaled to ensure that no single measurement dominates the distance calculation
due to units or magnitude.
5.4 K-Means, Hierarchical Clustering, and Silhouette Score
5.4.1 K-Means Clustering
K-Means partitions the dataset into (K) clusters by minimizing the within-cluster sum of squared
distances:
min
{𝐶𝑘}
𝐾
∑
𝑘=1
∑
x𝑖∈𝐶𝑘
‖x𝑖 − 𝜇𝑘‖2
where (𝐶𝑘) is the set of points in cluster (𝑘)and (𝜇𝑘) is the centroid of that cluster. In process
terms, each centroid represents a typical operating condition for that regime.
5.4.2 Hierarchical Clustering
Hierarchical clustering constructs clusters through successive merging or splitting based on inter-
point distances. In agglomerative hierarchical clustering, each observation starts as its own cluster,
and clusters merge according to a linkage criterion (single, complete, or average linkage). This
approach is useful when the number of operating regimes is unknown a priori .
40
5.4.3 Silhouette Score
The silhouette coefficient for observation (𝑖)measures clustering quality:
𝑠𝑖 = 𝑏𝑖 − 𝑎𝑖
max(𝑎𝑖, 𝑏𝑖)
where (𝑎𝑖) is the average distance between observation (𝑏𝑖) and all other points in its cluster, and
(𝑏𝑖) is the minimum average distance between (𝑖)and points in other clusters. From an engineering
standpoint, high (𝑠𝑖) indicates well-separated operating regimes, while low (𝑠𝑖) suggests overlapping
or poorly defined regimes.
5.5 Physical Interpretation of Clusters in Process Engineering
Clusters obtained from process data are mathematical constructs and do not inherently correspond
to physical states. Engineering interpretation is essential. Cluster centroids can be examined to
identify representative temperatures, pressures, flow rates, and compositions.
• A cluster with high temperatures and flow rates may correspond to high-throughput operation.
• A cluster with moderate temperatures and flow rates may indicate energy-efficient steady-state
operation.
• Dispersed clusters with low silhouette scores may reflect transitional or unstable regimes.
Clustering serves as a bridge between raw data and engineering insight, enabling hypothesis
generation rather than direct causal inference.
5.6 Python Implementation
5.6.1 Clustering Feed Compositions and Operational Regimes
We now apply clustering to hypothetical data representing feed composition and operating conditions
within a separation process. The data are generated to reflect physically reasonable operating ranges
and process variability.
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score
np.random.seed(42)
41
n_samples = 300
temperature = np.random.normal(360, 12, n_samples) # K
pressure = np.random.normal(18, 2.5, n_samples) # bar
flow_rate = np.random.normal(120, 15, n_samples) # kmol/h
feed_fraction = np.random.uniform(0.3, 0.9, n_samples) # mole fraction
data = pd.DataFrame({
"Temperature": temperature,
"Pressure": pressure,
"FlowRate": flow_rate,
"FeedFraction": feed_fraction
})
data.head()
Temperature Pressure FlowRate FeedFraction
0 365.960570 15.927512 131.354829 0.396456
1 358.340828 16.599547 106.167520 0.790780
2 367.772262 19.868234 133.044089 0.799281
3 378.276358 19.525926 140.334568 0.604481
4 357.190160 17.947746 126.201524 0.303832
scaler = StandardScaler()
scaled_data = scaler.fit_transform(data)
kmeans = KMeans(n_clusters=3, random_state =42)
clusters = kmeans.fit_predict(scaled_data)
data["Cluster"] = clusters
silhouette_score(scaled_data, clusters)
0.1583856508707817
plt.figure()
for c in sorted(data["Cluster"].unique()):
subset = data[data["Cluster"] == c]
plt.scatter(
subset["Temperature"],
subset["FlowRate"],
label=f"Cluster {c}",
alpha=0.7
)
42
plt.xlabel("Temperature (K)" )
plt.ylabel("Flow Rate (kmol/h)" )
plt.title("Clustering of Feed and Operating Conditions" )
plt.legend()
plt.show()
5.7 Engineering Case Study: Identifying Operating Regimes in a
Distillation Process Using Synthetic Data
In a distillation column, operating regimes are influenced by feed composition, throughput, and
thermal conditions. Identifying these regimes is critical for maintaining separation efficiency and
avoiding flooding or weeping.
By clustering operating data, distinct regimes emerge that correspond to combinations of feed
fraction, flow rate, and temperature. Examination of cluster centroids allows engineers to associate
each regime with energy consumption levels and separation performance. Clusters with high internal
variability may indicate unstable operation or frequent transitions caused by disturbances or control
actions.
This analysis does not replace detailed column modeling but provides a data-driven overview that
supports monitoring and operational decision-making.
43
5.8 Chapter Summary
This chapter presented clustering as an unsupervised learning technique for identifying structure in
multivariable process data. The mathematical foundations of K-Means and hierarchical clustering
were introduced, along with the silhouette score as a measure of cluster quality. Through a synthetic
distillation process example, clustering was shown to reveal physically meaningful operating regimes,
reinforcing its role as an exploratory and diagnostic tool in chemical engineering practice.
44