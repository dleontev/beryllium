defmodule BackendWeb.NotificationsChannel do
  use BackendWeb, :channel
  #alias BackendWeb.Endpoint
  alias Backend.Auth

  def join("notifications:discussion" <> discussion_id, payload, socket) do
    agent_name = String.to_atom(discussion_id)
    IO.puts("AGENT NAME ----------------------------")
    IO.puts(agent_name)
    case({authorized?(payload), GenServer.whereis(agent_name)}) do
      {true, nil} -> 
        IO.puts("---------------------{true, nil} --------------------")
        [head | tail] = Auth.get_children_of_discussion(discussion_id)
        #Agent.start_link(fn -> head end, name: {:global,agent_name})
        BackendWeb.Notification.start_child(agent_name, head)
        {:ok, socket}
      {true, _} -> 
        IO.puts("---------------------{true, _} --------------------")
        {:ok, socket}
      {false, _} ->
        IO.puts("---------------------{false, _} --------------------")
        {:error, %{reason: "unauthorized"}}
    end
  end


  def join("notifications:replies" <> post_id, payload, socket) do
    agent_name = String.to_atom(post_id)
    case ({authorized?(payload)}) do
      {true} ->
        {:ok, socket}
      {false} ->
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
    IO.puts("GETTING EXISTING AGENT --------------------------")
    IO.inspect(GenServer.whereis(agent_name))
    amountOfReplies = Agent.get(agent_name, fn amount -> amount end)
    {:reply, {:ok, %{amount: amountOfReplies}}, socket}
  end


  def handle_in("new_comment", _, socket) do
    broadcast socket, "new_response", %{}
    {:noreply, socket}
  end


  def handle_in("edit_comment", _, socket) do
    broadcast socket, "edit_response", %{}
    {:noreply, socket}
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
