# Item Entry Suitelet

This repository contains a Suitelet script designed to simplify the item entry process in NetSuite. The script allows users to create new inventory items with ease by providing a user-friendly form for entering item details.

## Features

- User-friendly form for entering item details such as cost, retail price, display name, store description, MPN, product category, and location.
- Automatic generation of SKU (Stock Keeping Unit) based on the last entered item's SKU.
- Display of the most recently entered items in a table for easy reference.
- Validation and error handling to ensure accurate data entry.
- Integration with NetSuite's record and search modules for creating and retrieving item records.

## Prerequisites

Before using this script, ensure that the following requirements are met:

- Access to a NetSuite account with SuiteScript 2.0 enabled.
- Sufficient permissions to create and edit inventory items.

## Installation

To install and use this script in your NetSuite account, follow these steps:

1. Clone this repository to your local machine or download the source code as a ZIP file.
2. Log in to your NetSuite account.
3. Navigate to **Customization > Scripting > Scripts**.
4. Click the **New** button to create a new script.
5. Enter a name for the script (e.g., "Item Entry Suitelet").
6. Change the search id's in the script in accordance with your saved searches.
7. Copy the code from the `cs_su_inv_record.js` file in the repository and paste it into the script editor.
8. Click the **Save** button to save the script.
9. Deploy the script as a Suitelet by clicking the **Deploy** button.
10. Configure the deployment settings according to your requirements.
11. Click the **Save** button to deploy the script.

## Usage

To use the Item Entry Suitelet, follow these steps:

1. Log in to your NetSuite account.
2. Navigate to the Suitelet's URL, which can be obtained from the deployment settings.
3. Fill in the required item details such as cost, retail price, display name, store description, MPN, product category, and location.
4. Click the **Submit** button to create a new inventory item based on the entered details.
5. The script will generate a SKU for the item based on the last entered item's SKU.
6. The most recently entered items will be displayed in a table for easy reference.

## Contributing

Contributions to this repository are welcome. If you have any suggestions, improvements, or bug fixes, please submit a pull request.

When contributing, please adhere to the following best practices:

- Follow the coding style and formatting conventions used in the existing codebase.
- Provide clear and detailed commit messages.
- Clearly document any new features or changes in the code.
- Test your changes thoroughly to ensure they work as intended.
- Ensure that your code does not introduce any security vulnerabilities or performance issues.
