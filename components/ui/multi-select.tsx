import { useId } from "react";
import Select, { Props } from "react-select";

const MultiSelect = (props: Props) => {
  return <Select {...props} instanceId={useId()} />;
};

export default MultiSelect;
