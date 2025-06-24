import { useThemeStore } from '../store/useThemeStore'


const HomePage = () => {
  const { theme } = useThemeStore();

  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  })
  return (
    <div data-theme={theme}>HomePage</div>
  )
}

export default HomePage