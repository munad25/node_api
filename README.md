# **Node API Endpoint**

|   Description| Method  |Endpoint   |Paramater   |Auth   | 
| ------------ | ------------ | ------------ | ------------ | ------------ |
|  Standar login | post  |/api/v1/auth/login   | email, password  |-   |
|  Standar registration |  post |  /api/v1/auth/register |email,password, firstName, lastName, birthDate   |-   |
|   Get all data user| get  |   /api/v1/users|   |Bearer token   |
|  Update user data |  patch |   /api/v1/users/:id|email,password, firstName, lastName, birthDate  |  Bearer token |
|  Delete user data | delete  |   /api/v1/users/:id |   | Bearer token  |
|Login / Register with facebook akun|get| /api/v1/auth/facebook||- |
