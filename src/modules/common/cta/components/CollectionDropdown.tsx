import { CW721s } from "@/utils/constants";
import { LINKS } from "@/utils/links";
import { truncate } from "@/utils/text";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";

interface CollectionDropdownProps {}
const CollectionDropdown: FC<CollectionDropdownProps> = (props) => {
  const {} = props;

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="ghost"
        fontSize="sm"
        rightIcon={<ChevronDown width={16} />}
      >
        Collections
      </MenuButton>
      <MenuList>
        {CW721s.map((address) => (
          <Link
            key={address}
            href={LINKS.collection(address)}
            passHref
          >
            <MenuItem as="a" key={address}>
              {truncate(address)}
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </Menu>
  );
};
export default CollectionDropdown;
