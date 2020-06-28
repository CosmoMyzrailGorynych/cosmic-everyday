set version=0.6.1

call aws s3 cp "D:\_namespace\_cosmicEverydayBuilds\CosmicEveryday-%version%-linux-x64.7z" s3://cosmicreleases/0/ --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers full=emailaddress=admin@nersta.ru
call aws s3 cp "D:\_namespace\_cosmicEverydayBuilds\CosmicEveryday-%version%-linux-x86.7z" s3://cosmicreleases/0/ --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers full=emailaddress=admin@nersta.ru
call aws s3 cp "D:\_namespace\_cosmicEverydayBuilds\CosmicEveryday-%version%-mac-x64.zip" s3://cosmicreleases/0/ --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers full=emailaddress=admin@nersta.ru

call aws s3 cp "D:\_namespace\_cosmicEverydayBuilds\CosmicEverydayInstaller_x32.exe" s3://cosmicreleases/0/ --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers full=emailaddress=admin@nersta.ru
call aws s3 cp "D:\_namespace\_cosmicEverydayBuilds\CosmicEverydayInstaller_x64.exe" s3://cosmicreleases/0/ --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers full=emailaddress=admin@nersta.ru

call aws s3 cp "D:\_namespace\_cosmicEveryday\app\CHANGELOG.md" s3://cosmicreleases/0/ --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers full=emailaddress=admin@nersta.ru --no-guess-mime-type --content-type text/plain
call aws s3 cp "D:\_namespace\_cosmicEverydayBuilds\package.json" s3://cosmicreleases/0/ --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers full=emailaddress=admin@nersta.ru --no-guess-mime-type --content-type application/json
