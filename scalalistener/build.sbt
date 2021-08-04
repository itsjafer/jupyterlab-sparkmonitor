name := "sparkmonitor"

version := "1.0"

scalaVersion := "2.12.10"

organization := "cern"

val sparkVersion = "3.0.1"

libraryDependencies ++= List(
  "org.apache.spark" %% "spark-core" % sparkVersion,
  "net.sf.py4j" % "py4j" % "0.10.9"
)
artifactPath in Compile in packageBin :=
   (baseDirectory { base => base / "../sparkmonitor/listener.jar" }).value
