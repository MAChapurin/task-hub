import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { ProfileItem } from "./profile-item";

export function SelectAccount() {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder={
            <ProfileItem
              src="https://github.com/evilrabbit.png"
              name="Rabbit Evil"
              mail="example@mail.com"
            />
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">
            <ProfileItem
              src="https://github.com/leerob.png"
              name="Frodo Baggins"
              mail="example@mail.com"
            />
          </SelectItem>
          <SelectItem value="banana">
            <ProfileItem
              src="https://github.com/evilrabbit.png"
              name="John Smith"
              mail="example@mail.com"
            />
          </SelectItem>
          <SelectItem value="blueberry">
            <ProfileItem
              src="https://github.com/shadcn.png"
              name="Jhon Smith"
              mail="example@mail.com"
            />
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
