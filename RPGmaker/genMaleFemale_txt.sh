edge-tts -l | grep ^en > edgenames.txt
# 1. Clean the voice identifier names and pull only the Females
grep "Female" edgenames.txt | awk '{print $1}' | sed -E 's/^en-[A-Z]{2}-//' | sed 's/Neural//' | sort -u > female.txt

# 2. Clean the voice identifier names and pull only the Males
grep "Male" edgenames.txt | awk '{print $1}' | sed -E 's/^en-[A-Z]{2}-//' | sed 's/Neural//' | sort -u > male.txt

# 3. Print confirmation counts to the terminal
echo "✅ Finished! Generated male.txt ($(wc -l < male.txt) names) and female.txt ($(wc -l < female.txt) names)."

