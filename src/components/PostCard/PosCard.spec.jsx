import { render, screen } from "@testing-library/react";
import React from "react";
import { PostCard } from ".";
import { postCardPropsMock } from "./mock";

const props = postCardPropsMock;

describe("<PostCard/>", () => {
  it("should render PostCard Correctly", () => {
    render(<PostCard {...props} />);
    expect(screen.getByAltText('title1')).toHaveAttribute('src', 'img/img.png');
    expect(screen.getByRole('heading', {name: 'title1'})).toBeInTheDocument();
    expect(screen.getByText('body1')).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const {container} = render(<PostCard {...props} />);
    //toMatchSnapshot é utilizado para gerar um snapshot do componente, para que caso ele seja alterado, ocorra um erro avisando que o elemento mudou
    expect(container).toMatchSnapshot();
  });
});
