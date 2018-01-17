defmodule BackendWeb.SectionView do
  use BackendWeb, :view
  alias BackendWeb.SectionView

  def render("index.json", %{sections: sections}) do
    %{data: render_many(sections, SectionView, "section.json")}
  end

  def render("show.json", %{section: section}) do
    %{data: render_one(section, SectionView, "section.json")}
  end

  def render("section.json", %{section: section}) do
    %{id: section.id}
  end
end
