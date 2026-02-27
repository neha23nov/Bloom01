import xarray as xr
import pandas as pd
from datasets import load_dataset

# Open the downloaded NetCDF file
ds = xr.open_dataset('era5_vegetation.nc')
ds = load_dataset("ba188/inaturalist")
train_df = ds["train"].to_pandas()
test_df  = ds["test"].to_pandas()

# See the variables and metadata
print(ds)
train_plants = train_df[train_df['taxon'].str.strip().str.lower() == "plantae"]
test_plants  = test_df[test_df['taxon'].str.strip().str.lower() == "plantae"]

# Access a specific variable, e.g., high vegetation cover
high_veg = ds['high_vegetation_cover']

# Convert to pandas DataFrame if needed
df = high_veg.to_dataframe().reset_index()
print(df.head())
train_plants.to_json("train_plants.json", orient="records")
test_plants.to_json("test_plants.json", orient="records")