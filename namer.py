



i=0
j=0
k=0
p=0
q=0
line=""
for i in range (48):
    while j <9:
        line="<td id=\""+str(k)+"."+str(j)+"\"</td>"
        if p==0:
            p=1
            k=k+1
        else:
            p=0
            k=k+16
        j=j+1
    j=0
    print(line)
    k=q+2
