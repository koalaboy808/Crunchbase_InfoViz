
# coding: utf-8

# In[1]:

import pandas as pd


# df['raised_amount_usd'] = df['raised_amount_usd'].apply(lambda x: ("".join(x.split(","))).strip())
# df.loc[df.funding_total_usd == '-', 'raised_amount_usd'] = None
# df['raised_amount_usd'] = df['raised_amount_usd'].map(lambda x: float(x) if x is not None else x)


# In[2]:

def split_backslash(x):
    try:
        return str(x).split("/")[1].strip()
    except:
        return x


# In[2]:

df = pd.read_csv("../raw_data_crunchbase/crunchbase-investments.csv")
# df = df[df['funded_year']==2013]
df['investor_permalink'] = df['investor_permalink'].apply(lambda x: split_backslash(x))
df = df.loc[df['investor_permalink']=='organization'] # change to person!!!!!!!

# from 20179 to 17617 for raised_amount_usd
df = df.loc[df["raised_amount_usd"].notnull()]
df['raised_amount_usd'] = df['raised_amount_usd'].apply(lambda x: "".join(x.split(",")).strip())
df.loc[df.raised_amount_usd == '-', 'raised_amount_usd'] = None

df['raised_amount_usd'] = df['raised_amount_usd'].map(lambda x: float(x) if x is not None else x)

# # all present for funding_round_type
# df = df.loc[df["funding_round_type"].notnull()]
# # from 17617 to 16553 for company_country_code
df = df.loc[df["investor_country_code"].notnull()]
df = df.loc[df["company_country_code"].notnull()]


# In[4]:

df.shape


# In[5]:

df.columns


# In[6]:

subset_df = df[["company_name", "company_country_code", "company_city",
                "investor_name","investor_country_code","investor_city",
                "funded_month","funded_year","raised_amount_usd"]]


# In[7]:

years_wanted = [2004,2005,2006,2007,2008,2009,2010,2011,2012,2013]


# In[8]:

subset_df = subset_df.loc[subset_df['funded_year'].isin(years_wanted)]
# subset_df = subset_df[subset_df['funded_year']>=2004 and subset_df['funded_year']>=2013]


# In[9]:

subset_df.head()


# In[10]:

subset_df.shape


# In[11]:

# subset_df.to_csv("aggregated-investments-maptime.csv", index=False)


# In[12]:

unique_date = set(subset_df['funded_month'])


# In[13]:

len(unique_date)


# In[14]:

# agg_df = subset_df[['company_city','funded_month']].groupby(["company_city"]).agg(['count']).reset_index()


# In[8]:

df = pd.read_csv("../convert_data/investor_city_rounds.csv")


# In[10]:

df


# In[12]:

df_group = df.groupby(['investor_city','funded_month']).size().reset_index(name="Count").sort(['Count'], ascending=[1])


# In[46]:

city_month = subset_df[['company_city','funded_month']]
city_month.groupby(['company_city','funded_month']).size().reset_index(name="Count").sort(['Count'], ascending=[1])
# city_month.loc[city_month['company_city'].isin(['New York'])]
# subset_df.loc[subset_df['funded_year'].isin(years_wanted)]


# In[15]:

df_group.to_csv("investor_city_rounds.csv", sep='\t')

