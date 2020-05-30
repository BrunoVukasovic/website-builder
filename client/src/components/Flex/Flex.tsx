import React from "react";
import cx from "classnames";

import styles from "./flex.module.scss";

export interface FlexProps extends React.HTMLProps<HTMLDivElement> {
  fluid?: boolean;
  flexOut?: boolean;
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-evenly"
    | "space-between"
    | "space-around";
  justifySelf?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-evenly"
    | "space-between"
    | "space-around";
  alignItems?: "flex-start" | "flex-end" | "start" | "end" | "center";
  alignSelf?: "flex-start" | "flex-end" | "start" | "end" | "center";
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
}

const Flex: React.FC<FlexProps> = ({
  fluid,
  flexOut,
  justifyContent,
  justifySelf,
  alignItems,
  alignSelf,
  direction = "row",
  className,
  ...props
}) => {
  let classes: string[] = [styles.dFlex, styles[`direction--${direction}`]];

  if (justifyContent) {
    classes = [...classes, styles[`justifyContent--${justifyContent}`]];
  }
  if (justifySelf) {
    classes = [...classes, styles[`justifySelf--${justifySelf}`]];
  }
  if (alignItems) {
    classes = [...classes, styles[`alignItems--${alignItems}`]];
  }
  if (alignSelf) {
    classes = [...classes, styles[`alignSelf--${alignSelf}`]];
  }
  if (fluid) {
    classes = [...classes, styles.fluid];
  }
  if (flexOut) {
    classes = [...classes, styles.flexOut];
  }

  return <div {...props} className={cx(...classes, className)} />;
};

export default Flex;
