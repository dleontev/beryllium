defmodule BackendWeb.PageView do
  use BackendWeb, :view
  def render("index.json", %{pages: pages}) do
    %{data: render_many(pages, BackendWeb.PageView, "page.json")}
  end

  def render("page.json", %{page: page}) do
    %{id: page.userid, name: page.name}
  end


  #def convertToJSON(pages: pages, initList)
  #
  #end
end
