defmodule BackendWeb.NotificationsChannel do
  use BackendWeb, :channel
  alias BackendWeb.Endpoint
  alias Backend.Auth

  def join("notifications:" <> discussion_id, payload, socket) do
    if authorized?(payload) do
      agent_name = String.to_atom(discussion_id)
      get_total = Auth.get_children_of_discussion(discussion_id)
      initLength = length(get_total)
      IO.inspect(get_total)
      if(GenServer.whereis(agent_name) == nil) do
        Agent.start_link(fn -> initLength end, name: agent_name)
      end
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end


  def handle_in("get_responses", %{"body" => discussion_id}, socket) do
    agent_name = String.to_atom(discussion_id)
    amountOfReplies = Agent.get(agent_name, fn amount -> amount end)
    {:reply, {:ok, %{amount: amountOfReplies}}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (notifications:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
