# API calls

### Register
| label | info    |
| --- | --- |
| Path | /register |
| Description | Register a User |
| Method | POST |
| Authentication | Not Required |
| Data Params | `{username:[str], password:[str], first_name:[str], last_name:[str], city:[str], state:[str]}` |
| Response Types | `Success (200 OK)`, `Bad Request (400)` |
| Success Response | `{userId:[num]}` |

### Login
| label | info    |
| --- | --- |
| Path | /login |
| Description | Log in as User |
| Method | POST |
| Authentication | Not Required |
| Data Params | `{username:[str], password:[str], first_name:[str], last_name:[str], city:[str], state:[str]}` |
| Response Types | `Success (200 OK)`, `Bad Request (400)` , `Unauthorized (401)`|
| Response | `{token:[str]}` |

### Search
| label | info    |
| --- | --- |
| Path | /search |
| Description | Search for users by topic |
| Method | GET |
| Authentication | Required |
| URL Params | `{topic:[str]}` |
| Response Types | `Success (200 OK)`, `Bad Request (400)`, `Unauthorized (401)` |
| Response | `{users:[arr]}` |

### Create Profile
| label | info    |
| --- | --- | 
| Path | /profile |
| Description | Create user profile |
| Method | POST |
| Authentication | Required |
| Data Params | `{first_name:[str], last_name:[str], city:[str], state:[str], avatar:[str], user_id:[num]}` |
| Response Types | `Success (200 OK)`, `Bad Request (400)`, `Unauthorized (401)` |
| Response | `{userId:[num]}` |

### Get Profile
| label | info    |
| --- | --- |
| Path | /profile |
| Description | View user profile |
| Method | GET |
| Authentication | Required |
| URL Params | `{userId:[num]}` |
| Response Types | `Success (200 OK)`, `Bad Request (400)`, `Unauthorized (401)` |
| Response | `{first_name:[str], last_name:[str], city:[str], state:[str], avatar:[str], topics:[arr]}` |

### Create Video Room
| label | info    |
| --- | --- |
| Path | /video |
| Description | Engage in video chat |
| Method | POST |
| Authentication | Required |
| Data Params | `{initiated_by:[num], invited:[num], room_name:[str|optional]}` |
| Response Types | `Success (200 OK)`, `Bad Request (400)`, `Unauthorized (401)` |
| Response | Success: `{url:[str]}` |
| Response | Error: `{msg:'Room name taken'}`|

### Create Message
| label | info    |
| --- | --- |
| Path | /message |
| Description | Create direct message |
| Method | POST |
| Authentication | Required |
| Data Params | `{to_profile_id:[num], from_profile_id:[num], message:[str]}` |
| Response Types | `Success (200 OK)`, `Bad Request (400)`, `Unauthorized (401)` |
| Response | `{success:[bln]}` |

### Get Messages
| label | info    |
| --- | --- |
| Path | /message |
| Description | Engage in message |
| Method | GET |
| Authentication | Required |
| URL Params | `{messages:[arr]}` |
| Response Types | `Success (200 OK)`, `Bad Request (400)`, `Unauthorized (401)` |
| Response | `{userId:[num]}` |

### Update Messages
| label | info    |
| --- | --- |
| Path | /message |
| Description | Engage in message |
| Method | PUT |
| Authentication | Required |
| URL Params | `{message_ids[arr]}` |
| Response Types | `Success (200 OK)`, `Bad Request (400)`, `Unauthorized (401)` |
| Response | `{success:[bln]}` |
