# RubyEncoder v2.7
if !defined?(RGLoader)||!RGLoader.respond_to?(:check_version)||!RGLoader.check_version('2.7') then _d=_d0=File.expand_path(File.dirname(__FILE__)); while true do _f=_d+'/rgloader/loader.rb'; load _f and break if File.exist?(_f); _d1=File.dirname(_d); if _d1==_d then break if defined?(RGLoader); raise LoadError, "Ruby script '"+__FILE__+"' is protected by RubyEncoder and requires a RubyEncoder loader to be installed. Please visit the https://www.rubyencoder.com/loaders/ RubyEncoder web site to download the required loader and unpack it into '"+_d0+"/rgloader/' directory in order to run this protected file."; exit; else _d=_d1; end; end; end; RGLoader_load('AAUAAAAEkAAAAIAAAAAA/wr4QOVHaQQX9M2u/v4kMSISLmK4aFOMrWvR1Nsq0nC0fkmT/fgClcx8yCLaxdBqjozxNefhDWZkbUA25joLeYC3qrhpYgmRN6yIp4JYyxKXdGQAY0Ejdqz0rbLZ0FSPEOcXzPhFfev1HLtGS9GtEdKziUoqfgXu+iJlw1L5bAw9KPhNW4kq10CPPy9ivIPa8hcAAAAFAAAAuAgAAFmW/nt6WciXGfJdVwI5RAIdhEsAe6z0A7lMmSzODtUpeoCb2L5reZN4LluZ8ejJ6Jm8H8rJ4hY3Kx2ZqTKWjtKGh93Qz1xlt1SH3pZlas+gsH5yuV2vkki6KlsSIWHEHUyGYUQXY6d3GMTJIGMl3V+4camb0sDzsG9Um/Y9ikK2kul0RlpIGa+A/nQvmY87pJZTBKBjyTgUk3TyS03AtUmoCvye6Jpe19I86jSkzdOZPJhp9Q6V0P/XwDHKESIxfz71ywqfhknjTo2W4YuW6xvzUKD8CI+QkJEe3FzTuXAG7aZXgPr/ZjzMsbmgOa6jV/qzo6TkyFMOxn8OEoK6hlL6jIbZT2oIRfjKgUQsMZTlthj2rPmuz3Jq1QYiVzQU90wUCBcEilWHBI3jTxgmj+n1iIMuND1nZUHYjpYs50Xw0aItvIyhI1G8+2ustYxmNFGEIhKO9qUwCzME+w9yxfjgH4x8aZkM8XLbeWYFNNpVbF2iD0rrZ/Ymq+dvBFOFMOZ3BCDNwelfXWra+PJhIe89iDLCcslCvMZxM7k6v9mnqIPadvuCnOdVRzrjoy8Aqwgezaot1T1Kw/dUemxKF5VFS87nGIBwwExT1yFDc+fw6Pvc3g09GflEiqwJuwZpvmu7hzNjoNpspc68hKSj24a1DuivOXPuwWqOsr5iQ4PHo3SXcLn9uvUsJPlLHGJgcO5oSty/k8+GKU1ITWpNm25br4AuwbGUi7sg8/kQkasBfkptBlS/S7kuK5QQ4MdR0WeGVLt8jzNyBMrAFgI9BlM4ElpxU1XbBafXhfNdc2VBHvAXZ+/9aKUFD8kY+Pa7AYVSC734pls7JeT7/TYyUm0V4WyFnu4zUaHbLsfyMKEJHHp7toawRAkiYUk6ipoJjOAcLBNcEYaywLneyMK3RiAeDMtitzfa37rnZGjPtrg3VcCp+m0F7Lq49mCaQlwtFeABJFbKI9LQg7qFxn6wfB4JWBHX9Gds4rC60a8bEodFHz0m9ZDByuE915VGlApvVtMYcTn915yREzFZixzrfaeUfAwH0Z7iw2hEhc/F0eB7ZrnRq2nPaJTAQ1qrKZLhxP7KRJs6STM2n4f7kWwdJDCUXMI3zY/VujR7IFN79vV0iPpPo/uBfhrn5lgPs1uE38rHdy4Bm3lfTvZa+KZeubl/KWSVZM7rcZ2OECYKK4d+CsuvEoGdGk1D1VcwkjH/ye2Vvw0OsqXKGc3OBh93lpAKYs+KCIUJ3JD8QS8cZ5f9M6lHNP/H0wzhVaHC6SnqhP2iHQk779Pni/5fsWm38k/WcNoTus9GLfQ437rW9PhvyHZRJrvYEBTVCqwhecseLVoGA3uU5FV2ofm4FgMEMUlNB0p4C6C+//0+kMQXTk7h/Ty4PLBwlrFItQqKiP+Xct+EB8ZEe1Vzco4AmO8u5PVgfN7NqbIoZPYZj4yaPUhPltXoj6zJ0FMJTvrWwAuLJRoSXQF+znORJxtMswNbgH9lebhMBJcMoAEcKE7bhtItsS2qC9A6ZMXJ0qmsJ7+kudy4JT/+OaSo4BlXeap1+9PkEbzpdiWRzDJmECEj5pviTWcF15Ni0fO1UhF02DbNLV31uPYkGyG4+juxWeC4qy3NFrKJeJsy1VlmXCxSeEjKCX3poqLQB1HYfOF+vTLftGqFNH60/wC3W3tc/AHL+PMdi453sgOPChgoCyEwCXm1P22rXVsHXAieXqyjp8ZHiSh4uhnPCn4xtpyVvMJEQ4sgWQIErvuaynP1vBf84rs2O+7IuXmuFJ5Wfwh2mqK5Zl/XCFhwAzVTJZqBVOGXr2DjNtVdaBQ640ZELbcNRs+FE+4aHzqYYi6/E4nbdtGJAIKQHsB6+GjbcBgwkgcra5trsLWRv6n0vFRpbHoUkeOTaoFyuWhDI9pW863vnsbB+6pjcmRpyIv4oMkSSuhkLrd9iehKX9OQwYPELHUi0o6JotfF+7iYsTU4FqDFjcMVAHopsvSLp7X2Uuhnp/cA4yjvzXDT6UuzSOYu4yCYel0Tkek3GB8ho2kzm+tgi7Jx4/5jdWq4iyVNK10VgLIYkdYCSpvCOS0NK/L+8aFwCu6exZsaOJoKHWDgYwkp9ns/0VYSBJdmbaZoyZyvTSt4Rx7qJfZvfOzEwvypr8pNA/yeU5qGzELrOxf2bhwQkvf1FszfqRIudDoSw7O5jSkOgRMnyYOMMSVkOqmmRuGiknr4yVaHYn5PXu9dX3+2SO0lMo5WvPZw0iQGpJdfvw/ZEZP8YAvBVmNCfnmzph8+atIsrDOgMvjl1C0ajrlcRGnZIJa1C+jcLApPvmo1lAhOoAJGJGdqyQylSJJ1dP5TVxzJ/CeeGHQha4x8O5ISujBVgCOtvR96uAbwGJKGQjen7NhyoYJ8XS2W0hfZYosfLx1FonlskzmS+M/l+b5XZtTYPTU5fsZi6jphGRip+WshavEMFFXML6MWOiciNk+F1loKBbjmMnqRByq3cgxHAzIXiZ+34cKftEIbZB6aszeTtdoF4a8EsqkfYIwXvMzwNdfxI3bOy/p9LCidVV/ODv7y4shIu82VR9k+sv8vssU74rgMOOIucAu0mvFEAi0ihvE64CpTr17GQ5wMq1gfbiwwcXPA3AcM1sJGYVqNp1nFAXsQtsDovjWo6H/+8qtlK23hfsgVmpwYf2PEdO+vq9og9oZpdaRNuyjp9WkD0SKbnGo+yj0F20Q14kCSHl0nrHfDIYCJozYtcvxmotFjTgdc4ptWJZv1U2/5I9CUETSp7Z3xDtisscafAwc1VrFDKpbyxlq78DYF5YQpBXLiDhACpNzlP1qiZRIPhLsnO6o4jmEI1Z+hi22AA3oRz8xIUuBq4gl9/Jxq4AAWFB77AHufKRGUppXJh7wz5lZ/3Tqg+XCw6snDofP5NkYBrF6wujlEg4/JbJCyi8BUZaO43DW7ey8g4GvYwBQuwGZG4qq8nmzRuJmcdga2+hgAAAAFAAAAuAgAALfuZYIvjRllrhZ4ZjYjSNGL4WG7fuVtupnGHx/9fPkFEHP5mR/3EBBxwFaWHNJKcLP0lTaxySQelYuJUWdGZleo4DJJj4j+lQrZaG7vSG9b8gvaDcyKMLRzUowWzF5PgN+ShhjmX33PTJOKtwmfq8LhUs1OLkkFrNfgNSqoe32atAujixBTmA9dtgxfORxySvKX/kJtcDPbq2yGosEF74B2074YfDuTX0o5/7YZm+uqeAgwQ/UWaXbWJAk4Qkf7v3dPQZ5XM6Job/cxqkR3TJT2f8QWhiX49o0dMjzUNCO+3DmTn9phKXsA8KuKWOB5MJzI9pcBDaI7ux0nvM6r8/gKDPTrc47K53gzqcnTuVu731xH2gfrtvsYcIM3YfDTKcBSRGUpb1ttj8VBWa6mC7DYDljhaTa4bQrVJERbJoyTajFaHhdMtkZiK1WSA03TLrWqHB4OZ9FihvlGDns973KOelYOw4O7OjxdB/AD6PDCdSxaWW1JQnydkcmIgz4R/hCcF8DtN1S+3Ozi7nIx8gESY7L6pNSF1hPpIEq7Ci3YO0g4STOvFhFqeJDwk+/ORKphcq+mVxhgMAXekUTEKh6sQj9CG9QMFOfcHL1+OCqRZfWNm1cTfYcw0oj7oFcxM5n76m5EUXulZe1yxtbLHhTQg0Z5KQd2Rq+3CoFM3OygcJKB/jrYM7nCM2ysmtDonwLmF8tsRSG39WzslTujid5h02bUz6OFwUyEvK7BlEayH/mtB85NsA/xMkYN1TYnQQODrnO2/chnto/auSjP38dwpNLGtm4b5rAvCCoKGc2uhYD6NH+MXNc7Wa0zj8/V+3TylS2oqUWuVOkLuifHL8nlIIbtdsdwCtEyBsodhMSixvZwkvqZL15wfQxs8v9XWItYpYU01+IV4Flqnh1tJu8fCSKSj+WMN+KrAQ/Wb1wmZ7X9NM7EqJamAZO6lcZZFqhKwTErwVmyIIQYx77QVt7cRfBMp4WRYyHw1CsOZfyEuxagB6VXw4YzCfRmEQG1JyPvjwyOLLZAPoPxBrEtpSqXjXPJ8SuJnssgVTMckeMEa+7s0mH2JNNUIV/fg128MK7ORUIr0V1Kl50Ep/TIoWZbbSwAEl+4ojjWXKTXDgIVJP59nwx7eXX/R5bPpN5as1E+eJAYnhm16T7XLASked9dnaY5zHXPOUp4bghlKGv+2AfMtGreMl5Is6lOkQ7vaUqUZoihTn7U2cA1OLGD0kyfSnu5jyn4P9/qnf8XI9/R13Ay+6feyE9T25dET8GA4d5Kn5lHsBfyxZdqVBbF6zYj8uGLy9p4lyAgJjohXPBRxZCYkF+hFh0yr7vdpJoXj9o4LO+sLIrga5DGrmzV3G2SkDFZKcZKWhYW2yeWsXIXB4rccwbUobLcwNi+LoFzwsfFq0zss7Dr7VF7vCna2/vBTJBYWnHLZ/n2ACxGrFRVNZjmufe7g1zvPXRQEMUFCKBCItu+x+ZbK7MKuqud0LiML6hWvMt/Bw8b8J7l+G6mlRrwL4jRaT6k0Ea4hd9n7yl3kpnESnXloG0E6a1rCLNys2JBnlltOTAXTxcWx8bFrYnYKw7hGHJehlhcDfq/aW5pMJWXMQo3EIjnqPywtmYF3J+y6FgNHgMmq5T9nyhGQVEX7BJNIjfCY8w3TV6F6qaq1bLvSnvRXnFrWA02zwXO6w3a16TkQTvWxL41384xYFSDvgfdcDguYAewE/BQsRuUZ1Gl6Z7gCYoQCvK3k/Sj80blIT0lb2Nqb64rcOMicjlABxHU1Y9XGsbZFV3FvdyGz+y/2BOPNVakcUtZKZbJgGZunwViMCoDVN9IkVuFZ7dIwXzvKQl+Av9glwzQgRfERfDqrBGu+8b+LIJ+9yFzq1HdhFaG6h8gaihuHIDBSnQXGeFXTjxINREFswcM4wPn+BA4X5HdzGwcN4coxYC8kKemTpurYyusIouINYaB7V4tYcno9dg+DnW2toApzayVUwjnHcbi1Yyga94ephFeclWcYLjPHNxrTZSWeLaZSAzDjl2Sy6iD8r7kOdPjDr8vkFHBAjAHKI/d7lx8p59e1GrZD93V3KZ6Bbhk+pI0WWKvHX0aAesKJeIKrDLKlwCj3tdE+RUeccbRofO7024OsnEB940viLRu1gNAHYVZPLd0iIfwgx11s683IV2sXR2BJQL85Uoz2NzHND6yqnyV2QO95IWNNWlROOG50BjacgGUrnVkh8nyr3X5uYQgndtgLj4HLo9rN/UDgWIBNMhaHdF73kiwevKcnLbTiio+HznawUxodAFqz8+mR6HaeKTAgngWzWGwVkfQ2SsiLZLPDada8SiKDUhIBZ2qJPCOf0MkIluA0LlsI6i8BOz+A/uP7+2lXakIZf3pfyMPCmThgZJfhlJT9rN5zZLHE1ajE1pqauLVbAsFCE7o/h3lB1+kRcewvHsl04IRxQfxcT0z09UWir2nqFAbahEOlPCtpYVlovnZ+/NqiKGRBOsTgp2i53b4ewT/CSInOn1WHN/U0XdscSxluyTUcg9rfTT3SLgv3kKpfqyFhQv9CDJvjaXp4/PYz9DjM2Lo8qMizivsYUf9p8sJ0yszj3wRi5ig4b7hBDSdu6Bp587Nj7ke5BKmcvg8uRpjN+hQ+JdY8yjjWN6s5P2In9vGM4qATcBSbjAAc2RKIo8cCtsL7e5hYk1OYLfWZ4vk7aC2tkVljZq058OTg3e0upLoXgG1IuPg6g70Kkqm/DfCBNcc76z0HH0nj6L74maR315PL0SKhKZfilfPcByUGQaYmbe18Qv1h2fPH2eb8SEMEaLjMtkAsBRH/i6/zqIgi1I1X/mzQMVcq+RehSu8vt+GjvsmKeOwMUNv75v79owt1awiIu+U1/wWad7ZrTW4fbDrIjgWFV7OIOHMJsYOJ2Rjoi5QEZEWlXC/rSgMizVJoEgkBLQ9og9mAmOJnsfg6PgcHef5bJZyD5CsBajZ1RkAAAAFAAAAYAgAABwgyLcDmay+l2IEmOE5Zr5Aski3ZYmetXIk6lyFX/+mKFpRwr7NzwCi9YLnx7h4mxoAsuMjdi7DctsuCRzvHLZe2Ks4tDbcvWlYxNucTwF8BMcBdKyhcXk3MDk3GeLEGvbNVkdxgdBtpRJxhri22pnVzogIBi/GgxEkj+MRKK58eQQEzRRhfy9iaOCtAiHa5qTW+erDx4ayDO7x65yhD/3wRnresUNAUu7Scbmk3HNhqAdq2o9KR8NicsXWy5J/JnG6k/sScU+Uxh6vpntbadxOT4v9FniZsJaxWK/h5p3TCJE8VUBcy639jAU+ZSjc7DgFUwYM/qAEg5GNuxiGtt9DxnSdbN7f2+b+7SFJ4lhT3HAOGwNdVdZrSiLGxom/On9/flHH1ggCxJeGUIPbTQ6jGysn63QMPVI4qBdDeCVW8LUSRKdlF0KZuK7AUB01uJ25+ulk1o5vfVJKVkFU4ne7QlVMjqfnWTgRbRphS7vtZzS6vL+ld5Vi7AdOcBVTWhALH8UzAqVA6Pr+uJ7WuObN4XOdOC2kwGLYFd9n2XS866laafImSA8+Um6ySAfHwoUoZP6d1hsaBpuv3syU3E22f5XVO+Phiz4IoB72PB8SVgVwhyug3HjmNJOORPQqomsLnGugEQmtkMXtRau8wP7CX3npJAZ5pjGdO506f/6N92nrK5qNyyTtqozdrTtubI5UoBu3/D+2OCONdUWB0Ij1Tcdoiy1w1EOfvy2R/mEU7e46fbdL9CB70xV/NDOVL9ntRK/jhHFcmAS69gON1DQWYuwvguaF6HZ88OyNAYrwj8XpNNqu4g+DDRz9RW+5hqcxyqhoYUTG7RCP520TPY2u0tUgAZ48vTPEUBm9SWY5DUldXRvmw9HqcF8jqyliYr+neD15NaibnX/fKzRCy9djBzxh46Ddj3Gq8JBMQR8TptxBmwkXOb7xcJi+yXwXRnfjQSXrybGr8hoaIU9feOe+yXySCjEHva6pRN7mL8aeliJjFndpeQweabvk+TzuIbRD1urHmYCGx0O5c73q/ju93BqYwC8hxDYK4qSPBKK8ymcE550rBRuZBfqqmo15EvAoQdX6CxLK7gS+CVQRE014BlYdfOwy1LnbxMC6Bt1MJYIh9LHyjRAubmLY07/FZOnUTkKDpHyvZ5U9k2O2p/C/rw54CDn9mR2oqJtApp17mPLAhjd7o+D14OLEvJ9udaRQAC49l9oCU8m3lEvQ5fMw4GEpgN9MR38GM4uTdhbQm+bB7WfPnhFHe9BtAeG1LhL7/RycRSUouymw53MW/BFvQdyjhVR9YKNASRQguQ3UhCLErLAnbNgK6hUk7gpcXPFL/8r5rZfjeRRQDz9lQJLWqZy5ze82Z0JQ+KkFlyioZJsSK5UiYLHtIqAv6s9uRKKVf83VipIPIQavGok71o7WfKZvZRNTL/p+1k4tfo+KQWHA4gyt+vHX4CAmt6FypR6BvcJzXFesUl/5cOmYB3l5IyJ345Gh22FEXqKs2Sqo0GZ6aP9T+cGCbOyXGPmPtsMMHXHJeyjWkUTrq1XtCJ8gRTOYhsE0z7dcwZ99sEKE4E7xyPP7rmRsOueU5lCc9jU/qDT0IwIOFYtc1s3nGPC2KzMcRUmK28WdRxLkFsg80EbF/OczkqjVICULadzMJU4aHOOM1PmxAoQNOfS5AgeHjCPzR2n0sGF2d8RmRfGcEPdVLXj6IWvvTt3btUC67Gi449kagp/cgbqS6mjAwyYgtQHMRMu2xMVRx6SyVoOdnJK4g31yx7Ce9dkI6uGpnhlcUB6ZrAD9aXDcuP05X2/xR7IiVwrmhn+ZefI3tol1JMFIWbtUx1PCkq8wx/YLLb7YtoQQYKL4pSzwMehobC2SqUY/a7E/0emaJhfLsEJn1bN5ntJbNbQOIGJ/C/MW68QPW4TtjWeO7vE+wcPWLQAwYTPGU/9mlOc1q/9cE28tRZeWfjvGGJ4eTuz1ER8v1MZsMoZ9gl4BXVogrN8mYq7yviwg2xiH/386lK64nUrbVmII+sCdvBAJmNy/WtehrngUhkWL9JKwydSKVTUBRB6Ultmy7dVHYMqlPCwp8ZOzwg/M9p7y4on+0gnD1oWmwPvXtQLzFsPk7Ay2R7pYZweHVErXa3R4MT7G5xEvtorr+ijbdAXzACu+XreSQ5QAnLBCy4ctGq+erKB4RvSyousC/9pjVj1bljadpmNh9STaHrhHZsdhWjZ2jI96UZ56Kl7RBTSUeGLGgzHg840ci9szqajuqNVC2NaOfkq3FyRgUHT2Y4N6zGTdfv2rz2JWK3MUb31HwEhDwLO4yKd3kOXY9kej36Hv1fVUleObcf78EdfrS5RCq3V2Fpeo3TdAGZPb2Sb8+coPrgn+8+CefiX+iduY2TQF8x6vFdF+f7hiIvz5DHVKPXYbYVmqI80S9W1cm9KQOvRtcfu+Qz0E4qcYcDOEnVWqWPSiCW8NrIx/Kp/MvE5OG8IEug946JpaK/zs8FCJezVcaBQth9pgMRpKXdhGeZdCVTsBl63iwRJIUu3L+aLaS7OOPYPBaOrdPqnDEbE7n4T0vOGWRnzV+2j0dP62XRbQiSod/mf8n8TOaUuf1GjtJGY16dn10yaev6YvStS39qf2XNiSpHEyAOjcohaHcJUML+nVGEduug9H1AuRRPp2WK3Z3FiBZ/+fED66G2nN86zOUM7r05Q7ovD2OOhgQ1IKwBqR4owWhEDcyuY9ExR8okDgb2z2drNR35LlQHrhiR71MG2Qvxpp7sOTJhErym8fDQDBIJM0/MCSzobdXFkI3KT38wzMPM9sBLkw1mgRxdpSehGnWcQhJDz02y1QyjXRZJozMI1gbA6MGgAAAAUAAACwCAAAyIDq4A/hicPmc2YxkzhPiSWnj8dLCK2LOgqrU2eJg8R7TrrB1Ta+9UON55NAeCcnO7hglG/OyJJ1Tlb3+sKkkfIxu/qugIu+FVLlYZcq/CINSIDTuWQzJAhpkWqIX8E4nhOaTCMey/h8ctNbkSHhj5XVHOjWRnRNyc9KHQnY+tamkcWi2+kY+up+zzENqjtgxHbdkz5Rb/5ouqdXW+Is6KokVt+K2B1VGM6YJ1hJfJYl89KtKknPQm1mW4hifte2uKGzqd4af4bP6KxSTgcSKuAvHIpQQcphN+9ozmMHX4oZzxrnK2wZMknHgkGA2KP4EAZa4QRA2ANAGiuioGIr1d0yJY4OKTtBldnnP1WuXJXI6UZhFRIJ0gkTqyDC0QE/+j4lTwgewxa43gg4tuQ9D732yKlLymIxYL1q8XkiBnLOCWynszQl22Vr5HLAQvBe6ypuMEXuf2NSqKuB2k0Q0f7/4BOH8/lcT3cbw8Z1LaRgCMMnvQowIv609T505Z/dZ3dK1md0HogCqFuOPpKKJLu7GDiEawa6+bmN2kkVKxaIfZppHfpG919l4TKVB2FjVOoz01IY/NsNgk3h6Ss72EwFu45Vly657FW917NridfE9PJLvAAo7rXUVNTN6uX2BMxoJq5Sf/erfAYeLGf/T4KfkrkIzscT+Q5yTJBfpEG1wPv4/Y85D4fQl758HN+i+mf1Git3YqtViL1KOZGZxDgkwrwdl8/cQQZ+zsgRZF06SlMbhNOt4VjV6B9eQFBgswBLEezU/o5Ex1oiz5gHM6CyKMLdTaiq3SP43CmrCuPMyeGem9IZw+AmLrNU63di1p4ifeo+e4LiwBBgg/h3hjJud6olj+jmIr15Is7+SVXMJuAoHGec7FrZ/r0Q+Y4buF3ZXrvg5OC8SpOIi+ECNwj0x58gziIwXbgsyZLuF+ABeVYGZGvz4bN4Xx9Ve4eNw92uwGaUL4ZlTNl5gQzJ0c5INm8c3xlV6yfy3wwn9EtOZrHHTAFeTGkt4aIg7Rz7GfisBzNVnHOR5huKJhwqZQF2vJcq1QNcsoASkuqpU7PHsId3cc2H1ilCWU//RL0nMaosDJ9eazNF1GrxRWy4UWlyov0HRZ90EnjI5ChPObcNdgzS8Ky0pSte3jwO+++WvOBL/iZf+J21jSq1n4G+3Elp5pMUyRi9RhC4bzld/JX/uIfO1URnUQM5H9iicRoVHedGqJtZtsizpRV5d2bkbFvVS8eoJV+c8A8QBGIL2gfIIIa84f7wZzY8QOXNgXZt8SdiL494aXhF8Wmqh6pWtkGIwdXDB2E8K39F9cGjadOwu7WoHxLLoYvqXwaI1Yk1NVbzUxS65LIR2HYijP+LGqZUMdl+D1c9PcIdrSo/5Rtqq5SoO/VKb/bBptBA1Bxbp5eV5qwRG2VAXyKTn+PKLLwfuKPHYh+MhBHQiPp3AG0Id8ZGpxm421ccF36R9F76bsYFqSyM77MFoiRgfKw1wkJXCBetxPFNO+taazz5c3LAyO6Qb85CpKhAi9FlEnAQHGmuAW7kbyoD7JWLqn3b7XyA/S3fxJaq0zpJIELivhSbKaI2kPaFb6L/fAyvgnySbQoBy7B4cLZ5bWjHqf18zcYC6pB6qGSgD7xB9bU3+zUhSNz/KSmDvVSlN+IHbjCJWIjaXqFSMZQqH4+QPgdFDulVQTdom+PaDulUGrxgt7V/TH1sG929d0aiObY04rCc9vzH1WPQb6Rq7v9AkZrRcU8cLPqZAvq3M+m/ZVk+goZ2XsFLP2ZvAOMkPA3UyDGMp9U2exLKUVYVXxtqMjdDUc0tN9mX0u+MoQfAR0kdqY0k+olbd5c/ktmOLRFtdk19D9tYSHe+thLKADQ3tDjibFV3qX3nCw75PjEf3IT6L2+okyzUKOutDhiVOv0mxVoPgqLKET8m350jC7PAXv3ldV1cT0HnYFwKBTED33QckeKFdLX6EDc6MeFsW5k5TQkaPaavARp+ALPlwbGpyiMyA0pu1FgFhzQaZtMRq96K6n2mtP2KdY4oUiijKuS7JTaBRfkmuU673Fm4pJV1M5+Wf0/ov8WYqf/NmSLnhqe2ENm6bvIOq5oXKX1UyYGsyFcWEzSzgH+9WyQ4WjMGkh6d4GPyqGes7sJnDQ8fW46yr8cU/baThFni9kCS6Ik9tsyEvGwo9BwaVKLf33yzJOYudlVnjgy4B/cToQRj4sXKj3ufPykZMKCvD/AJTJ1I9Pw5SQQLTqMPNT79z8rEXPR8RVMjj8sLmaYTuNGIm1k8+brvBZltBhbuSRNh3JQMl85hB3IYbJX8yFpZfqz+fpy3VMEabmS3G2qKD/xCLHy7ihPsz1kILZpTaNoAKecxmbg/jEyLT2d2+efvqr6StUKBWweCNEOaE0ywvbIZAd6YRCqrFQgRPYr8JFgr9M73ZB7nTNPwne3kcMOTHFr5wU1eS60KmWF9gl3tY1MurB+aU2FSUBPSKGI7Z3JbAZjEhiilJIdMxg7iOVboV+uXEgbHVKfoLyeJdOXJNPAClSgtSCmsN3CLUJ94fcgVn3KUD0vUnH4KlDmlM9Bt4KwObvi5LSIKLgogCGig7lZF7x2Jd6XyzKlgJyTmfDsWaU90hmQhI/xGlodnTbjFUEKb3Gdj4zn8QnQXvqGLXvHzSDOvsaLWv3uE1peWsaU9Oyjir7/vJSVBEib2qfsfjpPMCDyc9/S195Ny9lFwBUt2tIs/k1LdBXZCiHuqK9IhzBG1hclBJes+ueBm8b2YpxXQp0uPtY4tm1A7EHkFCeATVXrrOG2SbWDe2DXaV3kFiDjtOKh6pJknJqF7+mCKrpj//L/cGza1CISK8U6Uh9VR5p67s66UaSwo8kXK3HCbXCfsU3kyXnyo7ufe+Xp+YlgDrrrX+4jONwJH0cnoW2m6LSdnWcz7jpnRwv/wjQKG65zRBz/uG7KcNL7FeFLMussRD0+LJAAAAAA=');
