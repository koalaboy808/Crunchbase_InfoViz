
# coding: utf-8

# In[27]:

import pandas as pd


# In[28]:

df = pd.read_csv("../convert_data/investor_city_rounds.csv", encoding='iso-8859-1')


# In[29]:

df


# In[42]:

idx = df.groupby(['funded_month'])['Count'].transform(max) == df['Count']


# In[49]:

top_vc = df[idx]


# In[50]:

top_vc.to_csv("investor_city_rounds.csv", sep='\t')


# In[55]:

for i in top_vc['investor_city']:
    print("'"str(i) + "',")

