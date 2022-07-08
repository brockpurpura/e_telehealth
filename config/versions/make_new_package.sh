#!/bin/bash

# Reboot after running this command.

if [ "$#" -lt "1" ]
then
	echo "ERROR: Too few arguments to $0. Command: update_package_version {version_no}"
	exit 1
fi

VERSION="$1"

echo "$HOME/versions/e-telehealth-${VERSION}" 
if [ -d "$HOME/versions/e-telehealth-${VERSION}" ]
then 
	echo "ERROR: Directory for version ${VERSION} already exists"
	exit 1
fi

#echo "Running electron packager"

echo "Heading to versions directory"
cd ~/versions

echo ""
echo "Making version"
mkdir e-telehealth-${VERSION}
cd e-telehealth-$VERSION
mkdir DEBIAN
cd DEBIAN
cp ~/e_telehealth/config/versions/base_control control
sed -i -e "s/{{VERSION}}/$VERSION/g" control
cp ~/e_telehealth/config/versions/base_postinst postinst 
sed -i -e "s/{{USER}}/user/g" postinst 
cd ..
mkdir -p home/uheadmin/
cd home/uheadmin/
cp -r ~/e_telehealth/ .
cd ../..
sudo chown -R 1003:1003 home/
cd ~/versions
echo "Building package"
dpkg-deb --build e-telehealth-${VERSION}/
echo "Done!"

