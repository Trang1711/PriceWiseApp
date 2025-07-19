import pyodbc

conn = pyodbc.connect(
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=localhost;"
    "Database=AppPriceWise;"
    "UID=sa;"
    "PWD=SamIT6;"
)

if conn: 
    print("Connected")
else:
    print("Connection failed")
