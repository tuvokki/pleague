defmodule PleagueWeb.PageController do
  use PleagueWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
