import pandas as pd

df = pd.read_csv("../raw_data_crunchbase/crunchbase-companies.csv")
df['funding_total_usd'] = df['funding_total_usd'].apply(lambda x: ("".join(x.split(","))).strip())
df.loc[df.funding_total_usd == '-', 'funding_total_usd'] = None
df['funding_total_usd'] = df['funding_total_usd'].map(lambda x: float(x) if x is not None else x)
# print(df.head())
# df[['funding_total_usd']] = df[['funding_total_usd']].astype(float)
# print(df[(df['funding_total_usd']==None)])
# print(df.loc[df['funding_total_usd'] == None])
# print(df[:11])
df.to_csv("../convert_data/clean-crunchbase-companies.csv")