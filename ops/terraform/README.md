# Setting up your own Project Aspen environment

## Install Required Tools

You need the azure cli and terraform.  If you're on windows and have chocolatey installed, run `choco install azure-cli terraform /y`.

Log into the azure cli by running `az login`

## Prepare Terraform State

- Create a resource group in your azure subscription named `terraform-resources`.
- Create a storage service (using whatever name you choose) inside the `terraform-resources` resource group.
- Within your new storage service, create a container named `terraform`

This can be completed using the azure cli via the following commands (just make sure you replace yournewstorageaccountname123 with your own custom storage account name)
```
az group create --name terraform-resources --location westus
az storage account create --name yournewstorageaccountname123 --resource-group terraform-resources
az storage container create --name terraform --account-name yournewstorageaccountname123
```

## Initialize Terraform

- From within the project_aspen/ops/terraform directory, run `terraform init`
  It will ask you for the name of the storage account you just created.
- Create a `terraform.tfvars` file and add content similar to:

```
api_dbuser = "yourdbadminname"
api_dbpassword = "somethingReallyCrazyStrong92638263"
```

## Create Azure Resources

Run `terraform apply`

## Modify your GitHub Actions Workflow

- Copy the .github/workflows/azure-jonathan.yml file into your own azure-yourname.yml file.
- Modify all the references of 'jonathan' to refer to your name (assuming your branch is your first name)
- Log in to the azure portal and access the 'warmup' app service slot for your API.  Click on the 'get publish profile' button and send that to Jonathan.
- Once you hear back from Jonathan that he's created the GitHub environment secrets for you, commit and push your changes so your new GitHub Actions workflow can run.
- Give it a few minutes and check your API: https://aspen-api-xxxxxx.azurewebsites.net/health (modify that URL to include the 6 random characters specific to your Aspen instance).
