for i in $(seq 1 20)
do
  echo $i
  curl http://localhost:3000 -H "Token:Btest-token"
  echo ""
done
