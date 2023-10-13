# WELCOME DEVELOPERS

Please follow the codeguidelines while creating a PR.

## Routes Structure

| Routes       | Description                                                                                                                                                                                                                                                                                |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [collection] | Each collection in config has a dedicated type ( auction, markeplace, crowdfund, etc ). Based on id of collection provided in config this url is dynamically generated                                                                                                                     |
| cw721        | Most of our example uses cw721 as tokens. This route is specifically for cw721 rendering. Internally cw721 may render helper components like AuctionInfo, MarkeplaceInfo. If there is another ado used, create a dedicated route for it instead of adding switch statement for cw721 route |
| [tokenId]    | Each token in cw721 has its dedicated page generated dynamically from contract data                                                                                                                                                                                                        |

## Config Structure

| Field       | Description                                                                               |
| ----------- | ----------------------------------------------------------------------------------------- |
| Name        | Name of the Embeddable                                                                    |
| Chain Id    | Chain Id for the embedabble to connect on. Any incompatible ado will probably throw error |
| Collections | List of various collection. Collection can be auction, marketplace, crowdfund, etc.       |

For more info on config, take a look at config.json file

## How to create my own embeddable?

To run an embedabble using this approach, you will need to first create config file. Go to our webapp to create config file.

Once you have a valid config file, you can clone this project and replace config.json file.

_Do not forget to Uncomment code from AppProvider.tsx in private build_

If you wish to preview your embeddable instead if cloning, you can use the link provided while creating the config file from webapp.
